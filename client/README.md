# Campus Lost & Found Hub (Client)

This is the frontend client repository for the **Campus Lost & Found Hub** SaaS application, built with React, TypeScript, and Vite, featuring a clean modular architecture for managing campus-related lost and found items.

---

## 🚀 Tech Stack

* **Framework:** React with TypeScript (Vite)
* **Styling:** Tailwind CSS & DaisyUI
* **State Management & Data Fetching:** TanStack Query (React Query)
* **Routing:** React Router DOM
* **HTTP Client:** Axios (with cookie-based credentials support and direct backend endpoint configuration)
* **Notifications:** React Hot Toast

---

## 📂 Project Structure

```text
client/
├── public/               # Static public assets
├── src/
│   ├── api/              # API request modules (auth.ts, item.ts)
│   ├── assets/           # Images, icons, and static resources
│   ├── components/       # Reusable UI components (ItemCard, Navbar, ProtectedRoute)
│   ├── hook/             # Custom React hooks (auth.ts, item.ts)
│   ├── pages/            # View pages (Additem, Home, ItemDetailModal, Items, Landing, login, Notfound, Register)
│   ├── services/         # Core service utilities
│   ├── App.tsx           # Main application component & routes
│   ├── App.css           # Global application styles
│   ├── index.css         # Tailwind or base CSS index
│   └── main.tsx          # Application entry point
├── .gitignore            # Git ignore rules
├── .oxlintrc.json        # Linter configuration
├── index.html            # HTML root template
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── tsconfig.app.json     # TypeScript app configuration
├── tsconfig.json         # TypeScript main configuration
└── tsconfig.node.json    # TypeScript node configuration
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the frontend client locally on your machine.

### 1. Prerequisites
Make sure you have **Node.js** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/paingzinyemaung/campus-lost-and-found-hub.git
cd campus-lost-and-found-hub/client
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
The application will be running at `http://localhost:5173` (or the port specified by Vite).

---

## 🔒 Authentication & Security Features

* **Cookie-Based Sessions:** Communicates with the backend using secure HTTP-only cookies.
* **Protected Routes:** Restricts unauthorized navigation to private views using dedicated wrapper components (`ProtectedRoute`).
* **Clean Logout Flow:** Manages state clearance, cache resets, and redirection upon user sign-out.

---

## 📜 Available Scripts

* `npm run dev` — Starts the Vite development server.
* `npm run build` — Type-checks and builds the production application.
* `npm run preview` — Locally previews the production build.
