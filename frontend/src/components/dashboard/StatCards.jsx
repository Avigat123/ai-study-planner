import { BookOpen, CheckSquare, TrendingUp, Calendar } from "lucide-react";

function StatCards({ plans }) {
  // --- Derived metrics (all from existing API data) ---
  const activePlans = plans.length;

  const totalTasks = plans.reduce((sum, p) => sum + p.plan.length, 0);
  const completedTasks = plans.reduce(
    (sum, p) => sum + p.plan.filter((t) => t.completed).length,
    0
  );

  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const latestPlan = plans[0];
  const daysRemaining = latestPlan
    ? Math.max(
        0,
        Math.ceil(
          (new Date(latestPlan.deadline) - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const stats = [
    {
      id: "active-plans",
      label: "Active Plans",
      value: activePlans,
      icon: BookOpen,
      accent: "primary",
    },
    {
      id: "completed-tasks",
      label: "Completed Tasks",
      value: completedTasks,
      icon: CheckSquare,
      accent: "success",
    },
    {
      id: "overall-progress",
      label: "Overall Progress",
      value: `${overallProgress}%`,
      icon: TrendingUp,
      accent: "warning",
    },
    {
      id: "days-remaining",
      label: "Days Remaining",
      value: latestPlan ? daysRemaining : "—",
      icon: Calendar,
      accent: "error",
    },
  ];

  return (
    <div className="stat-grid">
      {stats.map(({ id, label, value, icon: Icon, accent }) => (
        <div key={id} className="stat-card" id={`stat-${id}`}>
          <div className={`stat-card-icon ${accent}`}>
            <Icon strokeWidth={1.75} />
          </div>
          <div className="stat-card-value">{value}</div>
          <div className="stat-card-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
