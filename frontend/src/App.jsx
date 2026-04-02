import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "./pages/Auth";

function App() {
  const [plans, setPlans] = useState([]);
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const api = axios.create({
    baseURL: "https://ai-study-planner-iktk.onrender.com"
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
  //Move token INSIDE axios headers dynamically
  //earlier 
  // This runs only once when component renders
  // If user logs in then  token updates and then axios still uses old token

  useEffect(() => {
    fetchPlans();
  }, []);


  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");

      setPlans(res.data?.length ? [res.data[0]] : []);// only takes latest one 
    } catch (err) {
      console.error(err);
    }
  };
  const reschedulePlan = async (id) => {
    try {
      setRescheduling(true);

      await api.post(`/plans/${id}/reschedule`);
      fetchPlans();

    } catch (err) {
      console.error(err);
    } finally {
      setRescheduling(false);
    }
  };

  const markComplete = async (id, day) => {
    try {
      await api.put(`/plans/${id}/complete`, {
        day: day
      });

      // refresh UI
      fetchPlans();
    } catch (err) {
      console.error(err);
    }
  };

  const createPlan = async () => {
    try {
      setLoading(true); //  start loading
      const token = localStorage.getItem("token");

      await api.post("/plans", {
        subject,
        deadline,
        difficulty
      });
      fetchPlans(); // refreshes ui

      setSubject("");
      setDeadline("");
      setDifficulty("medium");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); //  stop loading
    }
  };

  if (!token) {
    return <Auth setToken={setToken} />;
  }
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e2f, #2b2b4a)",
        padding: "40px",
        color: "white",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden"
      }}
    >

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        🚪 Logout
      </button>

      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #6366f1, transparent)",
          filter: "blur(120px)",
          opacity: 0.6,
          animation: "float1 10s ease-in-out infinite"
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #8b5cf6, transparent)",
          filter: "blur(120px)",
          opacity: 0.6,
          animation: "float2 12s ease-in-out infinite"
        }}
      />

      {/* CENTER WRAPPER */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "30px",
            fontWeight: "bold"
          }}
        >
          AI Study Planner
        </h1>

        {/* CREATE PLAN */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            textAlign: "center"
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Create Study Plan</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                backdropFilter: "blur(6px)"
              }}
            />

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                backdropFilter: "blur(6px)"
              }}
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                backdropFilter: "blur(6px)"
              }}
            >
              <option value="easy" style={{ color: "black" }}>Easy</option>
              <option value="medium" style={{ color: "black" }}>Medium</option>
              <option value="hard" style={{ color: "black" }}>Hard</option>
            </select>

            <button
              onClick={createPlan}
              disabled={loading}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background: loading
                  ? "#555"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
                transition: "0.3s"
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="spinner"></span>
                  Generating...
                </span>
              ) : (
                "🚀 Generate"
              )}
            </button>
          </div>
        </div>

        {/* PLANS */}
        {plans.map((plan) => {

          const totalTasks = plan.plan.length;
          const completedTasks = plan.plan.filter(task => task.completed).length;
          const progress = Math.round((completedTasks / totalTasks) * 100);

          return (
            <div
              key={plan._id}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                padding: "20px",
                borderRadius: "16px",
                marginBottom: "20px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)"
              }}
            >
              <h2 style={{ marginBottom: "5px" }}>{plan.subject}</h2>
              <p style={{ color: "#666", marginBottom: "10px" }}>
                Difficulty: {plan.difficulty}
              </p>

              <div style={{ marginBottom: "15px" }}>

                <p style={{ marginBottom: "5px", color: "#cbd5f5" }}>
                  Progress: {progress}%
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      transition: "0.4s"
                    }}
                  ></div>
                </div>

              </div>

              <button
                onClick={() => reschedulePlan(plan._id)}
                disabled={rescheduling}
                style={{
                  display: "block",
                  margin: "10px auto 20px auto",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "white",
                  cursor: rescheduling ? "not-allowed" : "pointer",
                  opacity: rescheduling ? 0.6 : 1
                }}
              >
                {rescheduling ? "Rescheduling..." : "🔄 Reschedule"}
              </button>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {plan.plan.map((task) => (
                  <li
                    key={task._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.1)"
                    }}
                  >
                    <span
                      style={{
                        color: task.completed ? "#9ca3af" : "#f9fafb",
                        textDecoration: task.completed ? "line-through" : "none"
                      }}
                    >
                      <strong>Day {task.day}:</strong> {task.task}
                    </span>

                    <button
                      onClick={() => markComplete(plan._id, task.day)}
                      onMouseOver={(e) => e.target.style.opacity = 0.8}
                      onMouseOut={(e) => e.target.style.opacity = 1}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        background: task.completed
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "linear-gradient(135deg, #3b82f6, #2563eb)",
                        color: "white",
                        cursor: "pointer"
                      }}
                    >
                      {task.completed ? "Done" : "Complete"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;