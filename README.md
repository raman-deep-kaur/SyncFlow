# Team Task Manager

A professional, role-based, full-stack collaborative task management application (inspired by Trello/Jira-lite). Built with a Django REST Framework backend and a React + Tailwind CSS frontend. Ready for zero-config production deployment on Railway (Backend + PostgreSQL) and Vercel (Frontend).

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

---

## Production Deployment Guide

### Backend Deploy (Railway + PostgreSQL)

1. **Database Setup**: Create a new project in [Railway](https://railway.app) and provision a **PostgreSQL** database. This automatically provides a `DATABASE_URL` environment variable.
2. **App Deployment**: Connect your backend Git repository to Railway.
3. **Environment Variables**: In your Railway app dashboard settings under **Variables**, set:
   - `SECRET_KEY` = `your-custom-production-secret`
   - `DEBUG` = `False`
4. **Deploy & Migrate**: Railway will automatically build and run your Django app using the `Procfile` (`web: gunicorn config.wsgi`). Run the final migrations on Railway by opening the Railway console or linking your terminal and executing:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

### Frontend Deploy (Vercel)

1. Open [Vercel](https://vercel.com) and click **Import Project**.
2. Select your frontend Git repository.
3. **API Endpoint Configuration**: Before deploying, make sure to change the `baseURL` inside `frontend/src/services/api.js` to point to your live Railway API backend:
   ```javascript
   const API = axios.create({
     baseURL: 'https://your-railway-app-url.up.railway.app/api/'
   })
   ```
4. **CORS Security**: Ensure you add your newly assigned Vercel URL to the `CORS_ALLOWED_ORIGINS` inside `backend/config/settings.py` so the backend securely accepts requests:
   ```python
   CORS_ALLOWED_ORIGINS = [
       'http://localhost:5173',
       'https://your-vercel-app-url.vercel.app',
   ]
   ```
5. Click **Deploy**!
