# Campus Lost & Found Hub (Server)

This is the backend server repository for the **Campus Lost & Found Hub** SaaS application, built with **Node.js, Express, TypeScript, Prisma ORM, and SQLite**, utilizing a feature-based modular architecture.

---

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** SQLite
- **ORM:** Prisma ORM
- **Authentication:** Cookie-based session management (`res.clearCookie`, httpOnly cookies, JSON Web Token)
- **File Uploads:** Multer

---

## 📂 Project Structure

```text
server/
├── .agents/              # Agent configurations
├── .claude/              # Claude assistant settings
├── .windsurf/            # Windsurf IDE configurations
├── dist/                 # Compiled production JavaScript output
├── generated/            # Generated client/types output
├── prisma/
│   ├── migrations/       # Database migration history
│   └── schema.prisma     # Prisma database schema & models
├── src/
│   ├── features/         # Feature-based modular structure
│   │   ├── auth/         # Authentication feature (controller, route)
│   │   └── item/         # Item management feature (controller, route)
│   ├── generated/        # Additional generated assets
│   ├── lib/              # Utility libraries and configurations
│   ├── middleware/       # Custom middlewares (auth.middleware, upload.middleware)
│   └── index.ts          # Application entry point
├── uploads/              # Stored uploaded files and images
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── dev.db                # SQLite development database file
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── prisma.config.ts      # Prisma configuration
└── tsconfig.json         # TypeScript configuration
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the backend server locally on your machine.

### 1. Prerequisites

Make sure you have **Node.js** installed on your system.

### 2. Clone the Repository

```bash
git clone <repository-url>
cd campus-lost-and-found-hub/server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root of the `server` directory and add your database configuration:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
```

### 5. Initialize Database with Prisma

Run Prisma migrations to set up your SQLite database tables:

```bash
npx prisma migrate dev --name init
```

### 6. Run the Server

For development with hot-reloading (using `tsx`):

```bash
npm run dev
```

For production building and running:

```bash
npm run build
npm start
```

The server will start running at `http://localhost:3000`.

---

## 🔒 Authentication & API Endpoints

- **Cookie-Based Sessions:** Manages user login states securely using HTTP-only cookies combined with JWT.
- **Logout Endpoint (`POST /api/auth/logout`):** Clears the server-side session cookie using `res.clearCookie` to safely terminate user sessions.

---

## 📜 Available Scripts

- `npm run dev` — Starts the TypeScript development server with live-reloading via `tsx`.
- `npm run build` — Compiles TypeScript files into JavaScript in the `dist/` directory.
- `npm start` — Runs the compiled production server from `dist/index.js`.
- `npx prisma studio` — Opens Prisma Studio to visually inspect and manage your SQLite database.
