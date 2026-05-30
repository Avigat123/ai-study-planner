import { Target } from "lucide-react";

function TodayFocus({ plans, onMarkComplete }) {
  // Find the first incomplete task across all plans (newest plan first)
  let focusPlan = null;
  let focusTask = null;

  for (const plan of plans) {
    const task = plan.plan.find((t) => !t.completed);
    if (task) {
      focusPlan = plan;
      focusTask = task;
      break;
    }
  }

  // Parse a short title from the full task text
  const parseTitle = (text = "") => {
    // Take up to the first colon or first 60 chars
    const colonIdx = text.indexOf(":");
    if (colonIdx > 0 && colonIdx < 60) {
      return text.slice(0, colonIdx).trim();
    }
    return text.length > 72 ? text.slice(0, 72).trim() + "…" : text;
  };

  const estimateHours = (difficulty) => {
    const map = { easy: "1 – 1.5 hours", medium: "2 – 3 hours", hard: "3 – 4 hours" };
    return map[difficulty?.toLowerCase()] || "2 hours";
  };

  if (!focusTask) {
    return (
      <div className="focus-card" id="today-focus">
        <div className="focus-card-header">
          <span className="focus-card-label">Today's Focus</span>
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
          All tasks are complete. Create a new plan to keep the momentum going.
        </div>
      </div>
    );
  }

  return (
    <div className="focus-card" id="today-focus">
      <div className="focus-card-header">
        <span className="focus-card-label">Today's Focus</span>
        <span className="badge badge-muted">
          {focusPlan.subject} · Day {focusTask.day}
        </span>
      </div>

      <div className="focus-card-body">
        <div style={{ flex: 1 }}>
          <div className="focus-task-title">{parseTitle(focusTask.task)}</div>
          <div className="focus-task-meta" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            {focusTask.task.length > parseTitle(focusTask.task).length
              ? focusTask.task
              : null}
          </div>
        </div>

        <div className="focus-meta-grid">
          <div className="focus-meta-item">
            <span className="focus-meta-label">Estimated Time</span>
            <span className="focus-meta-value">{estimateHours(focusPlan.difficulty)}</span>
          </div>
          <div className="focus-meta-item">
            <span className="focus-meta-label">Status</span>
            <span className="badge badge-warning">Pending</span>
          </div>
          <div className="focus-meta-item">
            <span className="focus-meta-label">Action</span>
            <button
              className="btn btn-primary btn-sm"
              id="focus-mark-complete"
              onClick={() => onMarkComplete(focusPlan._id, focusTask.day)}
            >
              <Target size={12} />
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayFocus;
