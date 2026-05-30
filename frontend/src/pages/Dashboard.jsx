import { useEffect, useState, useRef } from "react";
import api from "../api/client";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCards from "../components/dashboard/StatCards";
import TodayFocus from "../components/dashboard/TodayFocus";
import PlanGenerator from "../components/dashboard/PlanGenerator";
import PlanCard from "../components/dashboard/PlanCard";
import EmptyState from "../components/dashboard/EmptyState";

function Dashboard({ setToken }) {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const generatorRef = useRef(null);

  const userEmail = localStorage.getItem("userEmail") || "";

  // ── Data fetching ────────────────────────────────────────────
  const fetchPlans = async () => {
    try {
      const res = await api.get("/api/plans");
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ── Handlers ─────────────────────────────────────────────────
  const handleCreate = async ({ subject, deadline, difficulty }) => {
    try {
      setGenerating(true);
      await api.post("/api/plans", { subject, deadline, difficulty });
      await fetchPlans();
    } catch (err) {
      console.error("Failed to create plan:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleMarkComplete = async (planId, day) => {
    try {
      await api.put(`/api/plans/${planId}/complete`, { day });
      await fetchPlans();
    } catch (err) {
      console.error("Failed to mark complete:", err);
    }
  };

  const handleReschedule = async (planId) => {
    try {
      setRescheduling(true);
      await api.post(`/api/plans/${planId}/reschedule`);
      await fetchPlans();
    } catch (err) {
      console.error("Failed to reschedule:", err);
    } finally {
      setRescheduling(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
  };

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell">
      {/* ── Sidebar (desktop) ────────────────────────────────── */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onLogout={handleLogout}
        userEmail={userEmail}
      />

      {/* ── Main ─────────────────────────────────────────────── */}
      <div className="main-content">
        {/* Mobile top bar */}
        <TopBar onLogout={handleLogout} />

        <main className="page-container">
          {/* Welcome */}
          <WelcomeBanner userEmail={userEmail} plans={plans} />

          {/* Stats */}
          {!loadingPlans && <StatCards plans={plans} />}

          {/* Today's Focus */}
          {!loadingPlans && plans.length > 0 && (
            <TodayFocus plans={plans} onMarkComplete={handleMarkComplete} />
          )}

          {/* Plan Generator */}
          <div ref={generatorRef}>
            <PlanGenerator onCreate={handleCreate} loading={generating} />
          </div>

          {/* Plans Section */}
          <div className="section-header" style={{ marginBottom: "var(--space-4)" }}>
            <div>
              <div className="section-title">Study Plans</div>
              <div className="section-subtitle">
                {plans.length > 0
                  ? `${plans.length} plan${plans.length !== 1 ? "s" : ""} · Click a plan to expand tasks`
                  : "No plans yet"}
              </div>
            </div>
          </div>

          {loadingPlans ? (
            <div className="loading-state">
              <span className="spinner spinner-muted" style={{ width: 20, height: 20, borderWidth: 2 }} />
              Loading your plans...
            </div>
          ) : plans.length === 0 ? (
            <EmptyState onCreateClick={scrollToGenerator} />
          ) : (
            <div className="plans-list" id="plans-list">
              {plans.map((plan) => (
                <PlanCard
                  key={plan._id}
                  plan={plan}
                  onMarkComplete={handleMarkComplete}
                  onReschedule={handleReschedule}
                  rescheduling={rescheduling}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
