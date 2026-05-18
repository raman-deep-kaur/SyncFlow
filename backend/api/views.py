from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.utils.timezone import now

from .models import (
    Project,
    Membership,
    Task
)

from .serializers import (
    RegisterSerializer,
    ProjectSerializer,
    MembershipSerializer,
    TaskSerializer
)


def is_project_admin(user, project):
    return Membership.objects.filter(
        user=user,
        project=project,
        role='ADMIN'
    ).exists()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(
            membership__user=self.request.user
        ).distinct()

    def perform_create(self, serializer):
        project = serializer.save(
            created_by=self.request.user
        )

        Membership.objects.create(
            user=self.request.user,
            project=project,
            role='ADMIN'
        )


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(
            project__membership__user=user
        ).distinct()

    def create(self, request, *args, **kwargs):
        project_id = request.data.get('project')
        
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response(
                {'error': 'Project not found'},
                status=404
            )

        if not is_project_admin(request.user, project):
            return Response(
                {'error': 'Only admins can create tasks'},
                status=403
            )

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        task = self.get_object()

        membership = Membership.objects.filter(
            user=request.user,
            project=task.project
        ).first()

        if not membership:
            return Response(
                {'error': 'Not allowed'},
                status=403
            )

        # MEMBER restrictions
        if membership.role == 'MEMBER':
            # can only update own task
            if task.assigned_to != request.user:
                return Response(
                    {'error': 'You can only update your tasks'},
                    status=403
                )

            # only status can be changed
            allowed_fields = {'status'}
            for field in request.data.keys():
                if field not in allowed_fields:
                    return Response(
                        {
                            'error':
                            'Members can only update status'
                        },
                        status=403
                    )

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        task = self.get_object()

        if not is_project_admin(
            request.user,
            task.project
        ):
            return Response(
                {'error': 'Only admins can delete tasks'},
                status=403
            )

        return super().destroy(request, *args, **kwargs)


class DashboardView(APIView):
    def get(self, request):
        user = request.user

        tasks = Task.objects.filter(
            project__membership__user=user
        ).distinct()

        total_tasks = tasks.count()
        completed_tasks = tasks.filter(status='DONE').count()
        pending_tasks = tasks.exclude(status='DONE').count()
        overdue_tasks = tasks.exclude(status='DONE').filter(
            due_date__lt=now().date()
        ).count()

        return Response({
            'total_tasks': total_tasks,
            'completed_tasks': completed_tasks,
            'pending_tasks': pending_tasks,
            'overdue_tasks': overdue_tasks,
        })
