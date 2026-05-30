# AI Study Planner 🎓

A full-stack productivity application that generates AI-powered, day-by-day study roadmaps. Enter a subject, deadline, and difficulty level — the AI builds a structured plan. Track progress, mark tasks complete, and reschedule when needed.

### 🌐 Live Links
- **Frontend**: [https://ai-study-planner-1-et0c.onrender.com](https://ai-study-planner-1-et0c.onrender.com)
- **Backend API**: [https://ai-study-planner-iktk.onrender.com](https://ai-study-planner-iktk.onrender.com)

---

## ✨ Features

- **🤖 AI-Generated Study Plans** — Structured, realistic day-by-day tasks built from your subject, difficulty, and deadline using LLMs
- **🔄 Smart Rescheduling** — AI rebalances remaining incomplete tasks with one click
- **📊 Progress Tracking** — Progress bars, completion percentages, and per-task status across all active plans
- **🎯 Today's Focus** — Always surfaces the next pending task so you know exactly what to work on
- **📈 Dashboard Overview** — Stat cards showing active plans, completed tasks, overall progress, and days remaining
- **🔐 JWT Authentication** — Secure signup and login; all plans are scoped to the authenticated user

---

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Vanilla CSS (custom design system — 8px spacing scale, CSS custom properties)
- Axios
- Lucide React (icons)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs (authentication)
- OpenAI API client via OpenRouter (`gpt-4o-mini`)

---

## 🗂️ Frontend Architecture

```
src/
  api/
    client.js                        ← shared axios instance + JWT interceptor
  pages/
    Auth.jsx                         ← split-panel login / signup
    Dashboard.jsx                    ← main dashboard page
  components/
    layout/
      Sidebar.jsx                    ← fixed left navigation
      TopBar.jsx                     ← mobile header
    dashboard/
      WelcomeBanner.jsx              ← greeting + progress context
      StatCards.jsx                  ← 4 computed metric cards
      TodayFocus.jsx                 ← first incomplete task, prominent CTA
      PlanGenerator.jsx              ← create new roadmap form
      PlanCard.jsx                   ← collapsible plan card with progress bar
      TaskCard.jsx                   ← individual day task row
      RescheduleCard.jsx             ← AI reschedule prompt
      EmptyState.jsx                 ← zero-state UI
```

---

## 🚀 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/Avigat123/ai-study-planner.git
cd ai-study-planner
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_cluster_uri
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openrouter_or_openai_api_key
```

Start the server:
```bash
node --watch server.js
```

### 3. Setup the Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌍 Deployment

When deploying the backend (Render, Railway, etc.), configure these environment variables:
- `MONGO_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`

> **Note:** If `OPENAI_API_KEY` is missing or the AI call fails, the backend includes fallback logic that generates a sequential placeholder plan rather than returning a 500 error.

---

*Developed by [Avigat123](https://github.com/Avigat123)*
