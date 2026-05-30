import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TaskCard from "./TaskCard";
import RescheduleCard from "./RescheduleCard";

const DIFFICULTY_CLASS = {
  easy:   "badge-success",
  medium: "badge-warning",
  hard:   "badge-error",
};

function PlanCard({ plan, onMarkComplete, onReschedule, rescheduling }) {
  const [expanded, setExpanded] = useState(false);

  const totalTasks     = plan.plan.length;
  const completedTasks = plan.plan.filter((t) => t.completed).length;
  const incompleteTasks = totalTasks - completedTasks;
  const progress       = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const deadline   = new Date(plan.deadline);
  const daysLeft   = Math.max(0, Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24)));
  const diffClass  = DIFFICULTY_CLASS[plan.difficulty?.toLowerCase()] || "badge-muted";
  const progressColor = progress === 100 ? "success" : progress >= 50 ? "" : "warning";

  return (
    <div className="plan-card" id={`plan-${plan._id}`}>
      {/* ── Header ────────────────────────────────────────────── */}
      <div
        className="plan-card-header"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
        aria-expanded={expanded}
        id={`plan-header-${plan._id}`}
      >
        <div className="plan-card-left">
          <div className="plan-card-title">{plan.subject}</div>
          <div className="plan-card-meta">
            <span className={`badge ${diffClass}`}>
              {plan.difficulty
                ? plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)
                : "Medium"}
            </span>
            <span className="text-sm text-muted">
              {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining` : "Deadline passed"}
            </span>
          </div>
        </div>

        <div className="plan-card-right">
          <span className="text-sm text-muted" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>{completedTasks}</span>
            <span>/ {totalTasks} tasks</span>
          </span>
          <ChevronDown
            size={16}
            className={`chevron${expanded ? " open" : ""}`}
          />
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <div className="plan-progress-row">
        <div className="progress-track" style={{ flex: 1 }}>
          <div
            className={`progress-fill${progressColor ? ` ${progressColor}` : ""}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="plan-progress-text">{progress}% complete</span>
      </div>

      {/* ── Expanded: Reschedule prompt + tasks ───────────────── */}
      {expanded && (
        <>
          {incompleteTasks > 0 && (
            <RescheduleCard
              planId={plan._id}
              incompleteTasks={incompleteTasks}
              onReschedule={onReschedule}
              rescheduling={rescheduling}
            />
          )}

          <div className="plan-tasks-list">
            {plan.plan.map((task) => (
              <TaskCard
                key={task._id || `${plan._id}-${task.day}`}
                task={task}
                planId={plan._id}
                onMarkComplete={onMarkComplete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PlanCard;
