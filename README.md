# 📝 Note App – Full Stack Exercise

This is a full-stack Single Page Application (SPA) for managing notes with categories and filters. The app allows users to create, edit, delete, archive/unarchive notes, assign categories (tags), and filter notes by tag. It was built as part of the Full Stack Trainee/Jr Engineer hiring exercise.
---

### Runtimes
- **Node.js**: 22.17.1
- **pnpm**: 10.13.1
- **PostgreSQL**: 17.5

### Global CLI tools
- `pnpm` → https://pnpm.io/installation
- `psql` (PostgreSQL CLI client)

## 🚀 Run Instructions

Once the project is cloned:

```bash
chmod +x run.sh
./run.sh
```

This script automatically performs:
1. Installation of frontend dependencies (`pnpm install`)
2. Installation of backend dependencies (`pnpm install`)
3. Generation of Prisma client (`npx prisma generate`)
4. Initial database schema migration (`npx prisma migrate dev`)
5. Backend compilation (NestJS with TypeScript)
6. Simultaneous start of backend (NestJS on `localhost:3000`) and frontend (Vite on `localhost:5173`)

## 🌐 Technologies Used

### Frontend:
- React 19.1
- Vite 7.0.6
- TailwindCSS 4.1.11
- pnpm 8

### Backend:
- NestJS 11.1.5
- TypeScript 5.8.3
- Prisma ORM 6.12.0
- PostgreSQL 17.5

## 🔗 API Endpoints

- `GET /notes` — List active notes
- `GET /notes?archived=true` — Archived notes
- `POST /notes` — Create note
- `PUT /notes/:id` — Edit note
- `PATCH /notes/:id/archive` — Archive/unarchive
- `DELETE /notes/:id` — Delete note
---
## 📁 Project Structure

```
notes_app/
├── backend/
│   ├── src/
│   │   ├── notes/
│   │   ├── tags/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── EditModal.jsx
│   │   ├── CreateModal.jsx
│   │   └── ...
├── run.sh
└── README.md
```
## 🐞 Additional Notes
- The database connects via `postgres://postgres:postgres@localhost:5432/notes_db`.
- Make sure to create the `notes_db` database before running the script.
```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/noteapp?schema=public"
Replace <username> and <password> with your local credentials.

## 📬 Contact
This project was developed as a technical exercise. For any questions, write to me via GitHub or email 😄

