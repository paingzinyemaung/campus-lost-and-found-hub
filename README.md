<div align="center">

# 🎓 Campus Lost & Found Hub

  <p><b>A Modern Full-Stack SaaS Application for University Communities</b></p>

  <p>
    <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-Express-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>

  <p>
    <i>"Never lose track of your valuable belongings on campus again."</i>
  </p>

</div>

---

## ✨ Overview At A Glance

**Campus Lost & Found Hub** သည် တက္ကသိုလ်ကျောင်းဝန်းအတွင်း ပစ္စည်းပျောက်ဆုံးသူများနဲ့ ပစ္စည်းပြန်တွေ့ရှိသူများကို စနစ်တကျချိတ်ဆက်ပေးရန် ရည်ရွယ်တည်ဆောက်ထားသော **Full-Stack SaaS Application** တစ်ခု ဖြစ်ပါသည်။

- **Frontend:** အသုံးပြုရလွယ်ကူပြီး လှပသော UI ဖြင့် တည်ဆောက်ထားသော React + TypeScript Single Page Application။
- **Backend:** စနစ်ကျပြီး လုံခြုံသော Feature-based modular structure ဖြင့် တည်ဆောက်ထားသော Express + TypeScript Server။
- **Security:** HTTP-only Cookies နှင့် JWT ကို အသုံးပြုထားသော လုံခြုံစိတ်ချရသော Authentication စနစ်။

---

## 🗂️ Project Structure (Monorepo Layout)

ပရောဂျက် တစ်ခုလုံး၏ တည်ဆောက်ပုံကို အလွယ်တကူ သိရှိနိုင်ရန် အောက်ပါအတိုင်း ခွဲခြားထားပါသည် -

campus-lost-and-found-hub/
├── client/ # 💻 Frontend (React, Vite, Tailwind, TanStack Query)
│ └── src/
│ ├── api/ # API communication modules
│ ├── components/ # Reusable UI components (Navbar, ItemCard, etc.)
│ ├── hook/ # Custom React hooks
│ ├── pages/ # Application views (Home, Login, AddItem, etc.)
│ └── App.tsx # Main routing & layout
│
└── server/ # ⚙️ Backend (Node.js, Express, Prisma, SQLite)
├── prisma/
│ ├── migrations/ # Database migration history
│ └── schema.prisma # Database models & schema
├── src/
│ ├── features/ # Modular features (auth, item)
│ ├── middleware/ # Custom auth & upload middlewares
│ └── index.ts # Server entry point
└── uploads/ # Stored media & item images

---

## 🛠️ Tech Stack

- **Frontend Framework:** React with TypeScript (Vite) for a modern, type-safe UI.
- **Styling:** Tailwind CSS / DaisyUI for responsive design and clean components.
- **Data Fetching:** TanStack Query (React Query) for powerful asynchronous state management.
- **Backend Runtime:** Node.js, Express, and TypeScript running via tsx watch mode.
- **Database & ORM:** SQLite paired with Prisma ORM for type-safe database operations.
- **Authentication:** JWT and HTTP-only Cookies for secure session handling and clean logout flows.
- **File Handling:** Multer for managing item images and local uploads.

---

## 🚀 Getting Started & Installation

ဒီပရောဂျက်ကို ကိုယ့်ရဲ့ Local စက်တွင် စမ်းသပ်လည်ပတ်ရန် အောက်ပါအဆင့်များကို အစဉ်အတိုင်း လုပ်ဆောင်ပါ။

### 1. Clone Repository

git clone https://github.com/paingzinyemaung/campus-lost-and-found-hub.git
cd campus-lost-and-found-hub

### 2. Setup Backend Server

Terminal တစ်ခုဖွင့်ပြီး server ဖိုင်တွဲသို့ သွားပါ -
cd server
npm install

- server/ ထဲတွင် .env ဖိုင်အသစ်ဖန်တီးပြီး အောက်ပါအတိုင်း ထည့်ပါ:
  PORT=5000
  DATABASE_URL="file:./dev.db"

- Database Migrate လုပ်ပြီး Server ကို စတင်ပါ:
  npx prisma migrate dev --name init
  npm run dev
  _(Backend Server ကို http://localhost:3000 ဖြင့် စတင်လည်ပတ်ပါမည်)_

### 3. Setup Frontend Client

Terminal အသစ်ထပ်ဖွင့်ပြီး client ဖိုင်တွဲသို့ သွားပါ -
cd client
npm install
npm run dev
_(Frontend Application ကို http://localhost:5173 ဖြင့် ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ)_

---

## 📜 Available Commands Summary

### ⚙️ Server Scripts (/server)

- npm run dev — ထည့်သွင်းထားသော tsx ဖြင့် Hot-reloading လုပ်ကာ Development Server စတင်ရန်။
- npm run build — TypeScript ကို Production သို့ JavaScript သို့ dist/ ဖိုင်တွဲထဲသို့ Compile လုပ်ရန်။
- npx prisma studio — SQLite Database ထဲက အချက်အလက်များကို Visual UI ဖြင့် ကြည့်ရှုစစ်ဆေးရန်။

### 💻 Client Scripts (/client)

- npm run dev — Vite Development Server ကို စတင်ရန်။
- npm run build — Production အတွက် Optimized ဖြစ်အောင် Build လုပ်ရန်။
