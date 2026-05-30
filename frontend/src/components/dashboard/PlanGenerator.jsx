import { useState } from "react";
import { Plus } from "lucide-react";

function PlanGenerator({ onCreate, loading }) {
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  // Compute min date as tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!subject.trim() || !deadline) return;
    await onCreate({ subject, deadline, difficulty });
    setSubject("");
    setDeadline("");
    setDifficulty("medium");
  };

  return (
    <div className="generator-card" id="plan-generator">
      <div className="section-header">
        <div>
          <div className="section-title">Create New Roadmap</div>
          <div className="section-subtitle">
            Set your subject, deadline, and difficulty to generate an AI study plan.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="generator-form-grid">
          {/* Subject */}
          <div className="form-group">
            <label className="form-label" htmlFor="gen-subject">
              What would you like to learn?
            </label>
            <input
              id="gen-subject"
              type="text"
              className="form-input"
              placeholder="e.g. React, Python, Machine Learning"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Deadline */}
          <div className="form-group">
            <label className="form-label" htmlFor="gen-deadline">
              Target deadline
            </label>
            <input
              id="gen-deadline"
              type="date"
              className="form-input"
              value={deadline}
              min={minDate}
              onChange={(e) => setDeadline(e.target.value)}
              disabled={loading}
              style={{ colorScheme: "dark" }}
            />
          </div>

          {/* Difficulty */}
          <div className="form-group">
            <label className="form-label" htmlFor="gen-difficulty">
              Difficulty
            </label>
            <select
              id="gen-difficulty"
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={loading}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Submit */}
          <div className="form-group" style={{ justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !subject.trim() || !deadline}
              id="gen-submit"
              style={{ height: 40 }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Generate Plan
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlanGenerator;
