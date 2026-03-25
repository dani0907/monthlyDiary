# 📔 Daily Diary

A personal diary web application built with Angular and Node.js. Write, edit, and manage your daily memories with a clean and cute pastel UI.

---

## ✨ Features

- **Monthly Calendar View** — Browse your diary entries on an interactive monthly calendar. Days with entries are marked with a dot indicator.
- **Daily Diary Editor** — Click on any date to write or edit your diary entry for that day. Supports title, content, and tags.
- **Diary List View** — View all entries for a given month in a card-based layout. Click a card to open the editor on the right.
- **Tag System** — Add custom tags to each entry by typing and pressing Enter. Tags can be removed individually.
- **Theme Switcher** — Choose from 5 pastel color themes (Pink, Lavender, Mint, Peach, Gray) from the header. The entire UI updates instantly.
- **CRUD Operations** — Create, read, update, and delete diary entries, all persisted to MongoDB via a REST API.

---

## 🛠 Tech Stack

### Frontend

| Tech       | Description                             |
| ---------- | --------------------------------------- |
| Angular    | Component-based SPA framework           |
| TypeScript | Strongly typed JavaScript               |
| RxJS       | Reactive data handling with Observables |
| SCSS       | CSS with variables for theming          |

### Backend

| Tech       | Description             |
| ---------- | ----------------------- |
| Node.js    | JavaScript runtime      |
| Express    | REST API server         |
| Mongoose   | MongoDB object modeling |
| TypeScript | Type-safe backend code  |

### Database

| Tech    | Description             |
| ------- | ----------------------- |
| MongoDB | NoSQL document database |

---

## 📁 Project Structure

```
daily-diary/
├── frontend/          # Angular application
│   └── src/
│       └── app/
│           ├── calendar/          # Monthly calendar component
│           ├── calendar-page/     # Calendar + diary layout
│           ├── diary/             # Diary editor component
│           ├── monthly-diary/     # Diary list view
│           ├── header/            # Nav + theme switcher
│           ├── date.service.ts    # Shared date state (BehaviorSubject)
│           └── diary.service.ts   # API calls (HttpClient)
└── backend/           # Node.js + Express server
    └── src/
        ├── models/
        │   └── diary.model.ts     # Mongoose schema
        ├── routes/
        │   └── diary.routes.ts    # REST API routes
        └── index.ts               # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS)
- MongoDB (running locally)
- Angular CLI

### 1. Clone the repository

```bash
git clone https://github.com/your-username/daily-diary.git
cd daily-diary
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

The server runs at `http://localhost:3000`

### 3. Start the frontend

```bash
cd frontend
npm install
ng serve
```

The app runs at `http://localhost:4200`

### 4. Environment variables

Create a `.env` file in the `backend/` folder:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dailydiary
```

---

## 🔌 API Endpoints

| Method | Endpoint                            | Description          |
| ------ | ----------------------------------- | -------------------- |
| GET    | `/api/diaries/monthly?year=&month=` | Get entries by month |
| POST   | `/api/diaries`                      | Create a new entry   |
| PUT    | `/api/diaries/:id`                  | Update an entry      |
| DELETE | `/api/diaries/:id`                  | Delete an entry      |

---

## 🗓 TODO

- [ ] PWA support — install as a desktop/mobile app
- [ ] Search entries by keyword or tag
- [ ] Image attachments in diary entries
- [ ] Dark mode theme
- [ ] Export diary entries as PDF
- [ ] User authentication

---

## 📝 License

This project is for personal learning and portfolio purposes.
