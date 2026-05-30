import { MapPin } from "lucide-react";

function EmptyState({ onCreateClick }) {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-state-icon">
        <MapPin strokeWidth={1.5} />
      </div>
      <div className="empty-state-title">No Study Plans Yet</div>
      <p className="empty-state-desc">
        Create your first AI-generated roadmap to start tracking your learning progress.
      </p>
      <button
        className="btn btn-primary"
        onClick={onCreateClick}
        id="empty-create-btn"
      >
        Create Study Plan
      </button>
    </div>
  );
}

export default EmptyState;
