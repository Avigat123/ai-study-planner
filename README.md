# AI Study Planner 🎓

Welcome to the **AI Study Planner**! This is a full-stack web application that leverages artificial intelligence to create perfectly scheduled, localized, and detailed study plans for any subject. Just enter your subject, deadline, and difficulty level, and let the AI do the scheduling.

## Features ✨

- **🤖 AI-Powered Study Plans**: Creates structured, realistic day-by-day tasks based on your subject, difficulty setting, and deadlines using Large Language Models.
- **🔄 Dynamic Rescheduling**: Falling behind? Reschedule incomplete tasks with a single click and have the AI reorganize your remaining workload.
- **🔐 User Authentication**: Secure JWT-based Login and Signup capabilities so your plans are always securely tied to your user.
- **📊 Progress Tracking**: Built-in progress bar and daily task completion toggles.
- **✨ Modern UI**: Glassmorphism dashboard with smooth micro-interactions and dark-mode optimization.

## Tech Stack 🛠️

**Frontend:**
- React.js
- Axios (for API integrations)
- Flexbox/Grid + Custom CSS styling

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

**AI Configuration:**
- OpenAI API Client (configured to utilize OpenRouter's `gpt-4o-mini` model)

## Local Development 🚀

### 1. Clone the repository
```bash
git clone https://github.com/Avigat123/ai-study-planner.git
cd ai-study-planner
```

### 2. Setup the Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
MONGO_URI=your_mongodb_cluster_uri
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openrouter_or_openai_api_key
```

Start the backend server:
```bash
npm start
# or for development: npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
# or npm start depending on your configuration
```

### 4. Open the Application
Navigate to `http://localhost:5173` (or the port specified by Vite/React) in your browser!

## Deployment 🌍
If deploying to platforms like **Render**, **Vercel**, or **Heroku**, ensure you configure the following Environment Variables in the deployed backend dashboard to prevent the server from functioning incorrectly:
- `MONGO_URI`
- `OPENAI_API_KEY`
- `JWT_SECRET`

**Note on AI Failures**: If the `OPENAI_API_KEY` is not provided in your production environment, the app contains fallback safety logic that will still gracefully generate a sequential placeholder plan, preventing your application from suffering 500 crashes!

---
*Developed by [Avigat123](https://github.com/Avigat123)*