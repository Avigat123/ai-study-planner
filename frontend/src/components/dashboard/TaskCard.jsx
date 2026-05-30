import { CheckCircle2, Circle } from "lucide-react";

function TaskCard({ task, planId, onMarkComplete }) {
  return (
    <div className={`task-item${task.completed ? " completed" : ""}`} id={`task-${planId}-${task.day}`}>
      {/* Day badge */}
      <div className={`task-day-badge${task.completed ? " done" : ""}`}>
        {task.completed ? (
          <CheckCircle2 size={13} strokeWidth={2} />
        ) : (
          <span>{task.day}</span>
        )}
      </div>

      {/* Task text */}
      <div className="task-content">
        <p className={`task-title${task.completed ? " done" : ""}`}>
          {task.task}
        </p>
      </div>

      {/* Action */}
      <div className="task-action">
        {task.completed ? (
          <span className="badge badge-success">
            <CheckCircle2 size={10} />
            Complete
          </span>
        ) : (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onMarkComplete(planId, task.day)}
            id={`mark-complete-${planId}-${task.day}`}
          >
            <Circle size={12} />
            Mark done
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
