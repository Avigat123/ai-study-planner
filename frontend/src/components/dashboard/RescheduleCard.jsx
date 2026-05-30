import { RefreshCw } from "lucide-react";

function RescheduleCard({ planId, incompleteTasks, onReschedule, rescheduling }) {
  if (incompleteTasks === 0) return null;

  return (
    <div className="reschedule-card" id={`reschedule-${planId}`}>
      <div className="reschedule-text">
        <div className="reschedule-heading">Behind schedule</div>
        <div className="reschedule-desc">
          {incompleteTasks} unfinished task{incompleteTasks !== 1 ? "s" : ""} detected.
          AI can rebalance your remaining sessions.
        </div>
      </div>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => onReschedule(planId)}
        disabled={rescheduling}
        id={`reschedule-btn-${planId}`}
        style={{ flexShrink: 0 }}
      >
        {rescheduling ? (
          <>
            <span className="spinner" style={{ borderTopColor: "var(--warning)" }} />
            Rescheduling...
          </>
        ) : (
          <>
            <RefreshCw size={12} />
            Smart Reschedule
          </>
        )}
      </button>
    </div>
  );
}

export default RescheduleCard;
