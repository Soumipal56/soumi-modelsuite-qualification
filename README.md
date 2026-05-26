# Task Pipeline — Intern Assessment Repository

A minimal task management system built with the MERN stack (MongoDB, Express, React, Node.js).
This repository is intentionally imperfect and is used as an intern assessment base.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 + custom CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| File Uploads | Multer (local disk storage) |

---

## Project Structure

```
modelsuite-qualification/
├── client/          # React (Vite) frontend
│   └── src/
│       ├── api/     # Axios API helpers
│       ├── components/
│       │   ├── admin/
│       │   └── talent/
│       ├── context/ # AuthContext
│       └── pages/
├── server/          # Express backend
│   ├── config/      # MongoDB connection
│   ├── controllers/
│   ├── middleware/  # JWT auth + multer upload
│   ├── models/      # Mongoose schemas
│   ├── routes/
│   ├── scripts/     # Seed script
│   └── uploads/     # Local file storage (not for production)
```

---

## Prerequisites

- Node.js v18+
- MongoDB running locally (or a MongoDB Atlas URI)
- npm

---

## Setup & Running

### 1. Clone the repo

```bash
git clone https://github.com/modelsuite-ai/modelsuite-qualification.git
cd modelsuite-qualification
```

### 2. Configure the backend environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/task-pipeline
JWT_SECRET=secret123
PORT=5000
```

> ⚠️ Use a strong random string for `JWT_SECRET` in any real environment.

### 3. Install dependencies and seed the database

```bash
# Install server deps
cd server
npm install

# Seed 1 Admin, 2 Talents, and 5 sample Tasks
npm run seed
```

Seed credentials:

| Role | Email | Password |
|---|---|---|
| Admin | admin@test.com | password123 |
| Talent | talent1@test.com | password123 |
| Talent | talent2@test.com | password123 |

### 4. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## Running the Application

Open **two terminals**:

**Terminal 1 — Backend**
```bash
cd server
npm run dev
```
Server runs at: `http://localhost:5000`

**Terminal 2 — Frontend**
```bash
cd client
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## API Overview

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/tasks` | Admin | List all tasks |
| POST | `/api/tasks` | Admin | Create a task |
| PUT | `/api/tasks/:id` | Admin | Update a task |
| DELETE | `/api/tasks/:id` | Admin | Delete a task |
| GET | `/api/users/talents` | Admin | List talent users |
| GET | `/api/talent/tasks/available` | Auth | Get open tasks |
| GET | `/api/talent/tasks/mine` | Auth | Get my claimed tasks |
| PUT | `/api/talent/tasks/:id/claim` | Auth | Claim a task |
| POST | `/api/submissions/:taskId` | Auth | Submit a task (file upload) |
| GET | `/api/submissions/admin/all` | Admin | All submissions |
| PUT | `/api/submissions/:id/review` | Admin | Approve or reject |

---

## Known Limitations (Intentional for Assessment)

- No pagination on any list endpoint
- Dates stored and displayed as raw strings
- No file type or size validation on uploads
- CORS is wide-open (`*`) — not production safe
- JWT secret is hardcoded in `.env.example`
- Uploads are stored locally — not suitable for multi-instance deployments
- Task status is not updated automatically when a submission is approved
- No toast notifications — uses `alert()` for errors
- No mobile responsive layout

---

## Available npm Scripts

### Server (`/server`)
| Script | Command | Description |
|---|---|---|
| Start | `npm start` | Run with node |
| Dev | `npm run dev` | Run with nodemon (auto-reload) |
| Seed | `npm run seed` | Populate database with sample data |

### Client (`/client`)
| Script | Command | Description |
|---|---|---|
| Dev | `npm run dev` | Start Vite dev server |
| Build | `npm run build` | Production build |
| Preview | `npm run preview` | Preview production build |
