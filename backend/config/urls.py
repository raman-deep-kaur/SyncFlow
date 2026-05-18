from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "SyncFlow Workspace Admin"
admin.site.site_title = "SyncFlow Portal"
admin.site.index_title = "System Management Console"

urlpatterns = [
    path('admin/', admin.site.urls),

    path(
        'api/',
        include('api.urls')
    ),
]
