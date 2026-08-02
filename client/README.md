# Campus Lost & Found Hub (Client)

This is the frontend repository for the **Campus Lost & Found Hub** SaaS application, designed to help university students and staff easily report, find, and recover lost items on campus.

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
├── public/               # Static assets
├── src/
│   ├── api/              # API call functions (Axios configurations & endpoints)
│   ├── assets/           # Images, icons, and global styles
│   ├── components/       # Reusable components (Navbar, ItemCard, etc.)
│   ├── hook/             # Custom React Query hooks (useMe, useUserLogout, etc.)
│   ├── pages/            # Page components (Home, Login, Register, AddItem, etc.)
│   ├── App.tsx           # Main application entry & routes
│   └── main.tsx          # React DOM renderer
├── package.json          # Dependencies and scripts
└── README.md
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the client locally on your machine.

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
The application will be running at `http://localhost:5173` (or the port specified by Vite), communicating directly with the configured backend service endpoints.

---

## 🔒 Authentication & Security Features

* **Cookie-Based Auth:** Securely handles authentication state using HTTP-only cookies managed by the backend.
* **Protected Routes:** Restricts unauthorized users from accessing sensitive dashboards and features.
* **Clean Logout Sequence:** Triggers a backend logout endpoint to clear session cookies, clears local storage/session storage, and resets the TanStack Query cache before redirecting to the login page.

---

## 📜 Available Scripts

* `npm run dev` - Starts the development server.
* `npm run build` - Builds the application for production.
* `npm run lint` - Runs ESLint for code quality checks.
* `npm run preview` - Locally preview the production build.
