# SyncFlow — Premium Collaborative Task Hub

A professional, role-based, full-stack collaborative task management application (inspired by Trello/Jira-lite). Built with a Django REST Framework backend and a React + Tailwind CSS frontend.

### Live Deployment Links
*   **Frontend Client (Vercel):** [https://sync-flow-eight.vercel.app/](https://sync-flow-eight.vercel.app/)
*   **API Service (Railway):** [https://syncflow-production-22d7.up.railway.app/](https://syncflow-production-22d7.up.railway.app/)
*   **Workspace Admin Console:** [https://syncflow-production-22d7.up.railway.app/admin/](https://syncflow-production-22d7.up.railway.app/admin/)

---

## Features

- **JWT Authentication & Authorization**: Secure signup, login, and token-based state persistency.
- **Dynamic Role-Based Access Control (RBAC)**:
  - **Admins**: Can create/delete/edit projects and assign tasks.
  - **Members**: Can access their assigned tasks and update the status of those tasks.
- **Project Hub**: Create projects and manage automatic ownership. Project creators are dynamically assigned as the `ADMIN` of their projects.
- **Task Management**: Create tasks, assign due dates, link projects, and easily transition status (`Todo` ➔ `In Progress` ➔ `Done`) with inline action buttons.
- **Analytics Dashboard**: Real-time summary metrics reporting total, completed, pending, and overdue tasks, dynamically filtered and scoped to the active user's projects.
- **Protected Routing**: React routes are safeguarded using a custom high-order route sentinel wrapper.

---

## Tech Stack

### Frontend
- **React 18** (Vite SPA)
- **Tailwind CSS** (Utility-first styling)
- **React Router DOM** (Single-page routing)
- **Axios** (API requests with request token interceptor middleware)

### Backend
- **Django 6.0 & Django REST Framework**
- **psycopg2-binary** (PostgreSQL connector)
- **Simple JWT** (JSON Web Token authentication handler)
- **django-cors-headers** (CORS middleware protection)
- **WhiteNoise** (Highly optimized static file serving for production)
- **dj-database-url** (Dynamic environment database parser)

---

## Folder Structure

```text
team-task-manager/
│
├── backend/                  # Django REST Framework Backend
│   ├── api/                  # Core App (Models, Views, Serializers)
│   ├── config/               # Settings, Routing, WSGI
│   ├── staticfiles/          # Collected Production Static Assets
│   ├── Procfile              # Gunicorn process config for Railway
│   ├── runtime.txt           # Python Environment version
│   ├── requirements.txt      # Python dependencies
│   └── .gitignore            # Backend git ignored paths
│
├── frontend/                 # React Single Page App
│   ├── src/
│   │   ├── components/       # Layout components (Navbar)
│   │   ├── pages/            # View Pages (Login, Dashboard, Projects, Tasks)
│   │   ├── services/         # Axios API Client
│   │   └── utils/            # Protected Route Wrapper
│   ├── tailwind.config.js    # Tailwind layout settings
│   └── .gitignore            # Frontend git ignored paths
│
└── README.md                 # Main Documentation
```

---

## Local Setup Instructions

### 1. Backend Setup

From the root directory:

```bash
cd backend

# Create & activate a virtual environment
python -m venv venv
# On Windows (PowerShell):
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create an Admin Superuser
python manage.py createsuperuser

# Start the Development Server
python manage.py runserver
```

### 2. Frontend Setup

From another terminal instance at the root directory:

```bash
cd frontend

# Install package dependencies
npm install

# Run the React development server
npm run dev
```

The frontend will run at `http://localhost:5173/`. Open it in your browser and log in with your superuser credentials!

