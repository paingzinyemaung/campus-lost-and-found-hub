<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Campus%20Lost%20and%20Found%20Hub&fontSize=35&fontColor=fff&animation=fadeIn&fontY=38" width="100%" />

  <p><b>A Modern Full-Stack SaaS Application Designed for University Communities</b></p>

  <p>
    <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-Express-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  </p>

  <p>
    <i>"Never lose track of your valuable belongings on campus again. Seamlessly connect finders and seekers."</i>
  </p>

</div>

---

## 🎯 About The Project

**Campus Lost & Found Hub** is a robust, full-stack SaaS platform tailored specifically for university campuses. It bridges the communication gap between students who have lost their belongings and honest finders who want to return them safely. Built with a modern tech stack, it delivers high performance, secure session handling, and an intuitive user experience.

---

## 🚀 Key Features

- **🔐 Secure Authentication:** Implements HTTP-only Cookies and JWT for secure, stateless session management.
- **⚡ Advanced State Management:** Powered by TanStack Query for optimal server-state synchronization and caching.
- **📦 Modular Architecture:** Built with a clean, feature-based modular structure on the backend for effortless scalability.
- **🖼️ Media Uploads:** Integrated with Multer to handle fast and secure local image uploads for lost/found item listings.
- **📱 Fully Responsive UI:** Designed with Tailwind CSS to ensure a flawless experience across mobile, tablet, and desktop devices.

---

## 🛠️ Tech Stack & Architecture

| Layer            | Technology                   | Purpose                                                  |
| :--------------- | :--------------------------- | :------------------------------------------------------- |
| **Frontend**     | React, Vite, TypeScript      | Type-safe, high-performance Single Page Application      |
| **Styling**      | Tailwind CSS / DaisyUI       | Modern, responsive, and accessible UI components         |
| **State & Data** | TanStack Query (React Query) | Efficient asynchronous server state & caching management |
| **Backend**      | Node.js, Express, TypeScript | Scalable RESTful API server running on `tsx` watch mode  |
| **Database**     | SQLite & Prisma ORM          | Lightweight relational data management with type safety  |
| **Security**     | JWT & HTTP-only Cookies      | Robust protection against XSS and token theft            |

---

## 🗂️ Project Structure (Monorepo Layout)

    campus-lost-and-found-hub/
    ├── client/                 # 💻 Frontend Application (React + Vite + TypeScript)
    │   └── src/
    │       ├── api/            # Axios API integration modules
    │       ├── components/     # Reusable UI components (Navbar, Cards, Modals)
    │       ├── hook/           # Custom React hooks
    │       ├── pages/          # Application views (Home, Login, Dashboard, AddItem)
    │       └── App.tsx         # Root component & routing setup
    │
    └── server/                 # ⚙️ Backend Server (Node.js + Express + Prisma)
        ├── prisma/
        │   ├── migrations/     # Database migration audit logs
        │   └── schema.prisma   # Database schema models
        ├── src/
        │   ├── features/       # Modular feature controllers & routes (auth, items)
        │   ├── middleware/     # Authentication & Multer upload middlewares
        │   └── index.ts        # Application entry point
        └── uploads/            # Stored media assets for items

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### 1. Clone the Repository

    git clone https://github.com/paingzinyemaung/campus-lost-and-found-hub.git
    cd campus-lost-and-found-hub

### 2. Setup Backend Server

    cd server
    npm install

- Create a `.env` file inside the `server/` directory and configure your environment variables:
  PORT=3000
  DATABASE_URL="file:./dev.db"

- Run database migrations and start the development server:
  npx prisma migrate dev --name init
  npm run dev

_(The backend server will run at `http://localhost:3000`)_

### 3. Setup Frontend Client

Open a new terminal window, navigate to the client folder, and run:
cd client
npm install
npm run dev

_(The frontend application will run at `http://localhost:5173`)_

---

## 📜 Available Scripts & Commands

### Backend (`/server`)

- `npm run dev` — Starts the Express development server with live-reloading (`tsx`).
- `npm run build` — Compiles TypeScript code into production-ready JavaScript inside `dist/`.
- `npx prisma studio` — Opens Prisma's visual database GUI to inspect SQLite records.

### Frontend (`/client`)

- `npm run dev` — Launches the Vite development server.
- `npm run build` — Bundles and optimizes the application for production deployment.

---

## 👨‍💻 Author

**Paing Zin Ye Maung**

- GitHub: [paingzinyemaung](https://github.com/paingzinyemaung)

---

<div align="center">
  <p>⭐ Feel free to drop a star if you find this project useful!</p>
</div>
