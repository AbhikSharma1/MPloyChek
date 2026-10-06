# MPloyChek

Employee Management Portal — Angular 14 + Node.js/Express SPA

## Features
- **Login** with User ID, Password, and Role (General User / Admin)
- **JWT-based auth** with HTTP interceptor for token injection
- **Dashboard** — user profile card + employment records table with async loading (forkJoin + configurable API delay)
- **Admin panel** — full CRUD user management with live API delay slider to demonstrate async processing
- **Lazy-loaded modules** — Auth, Dashboard, Admin
- **Route guards** — role-based access control

## Architecture
```
MPloyChek/
├── backend/          # Node.js/Express REST API (in-memory store)
│   ├── routes/
│   │   ├── auth.js   # POST /api/auth/login
│   │   ├── users.js  # GET/POST/PUT/DELETE /api/users
│   │   └── records.js# GET /api/records
│   ├── db.js         # In-memory data store
│   ├── middleware.js  # JWT auth + role guard
│   └── server.js
└── frontend/         # Angular 14 SPA
    └── src/app/
        ├── core/     # CoreModule: services, interceptor, guard, models
        ├── auth/     # Login page (lazy-loaded)
        ├── dashboard/# User dashboard (lazy-loaded)
        ├── admin/    # User management (lazy-loaded, Admin only)
        └── shared/   # Navbar component
```

## Running Locally

### Backend
```bash
cd backend
npm install
npm start
# API runs on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
ng serve
# App runs on http://localhost:4200
```

## Demo Credentials
| Role         | User ID  | Password   |
|--------------|----------|------------|
| Admin        | admin01  | Admin@123  |
| General User | user01   | User@123   |
| General User | user02   | User@123   |

## API Endpoints
| Method | Endpoint              | Auth     | Description                        |
|--------|-----------------------|----------|------------------------------------|
| POST   | /api/auth/login       | None     | Login, returns JWT                 |
| GET    | /api/users/me         | Any      | Current user profile               |
| GET    | /api/users?delay=ms   | Admin    | All users (with optional delay)    |
| POST   | /api/users            | Admin    | Create user                        |
| PUT    | /api/users/:userId    | Admin    | Update user                        |
| DELETE | /api/users/:userId    | Admin    | Delete user                        |
| GET    | /api/records?delay=ms | Any      | Employment records (role-filtered) |
