import { BookOpen, LogOut } from "lucide-react";

function TopBar({ onLogout }) {
  return (
    <header className="topbar" role="banner">
      <div className="topbar-logo">
        <div className="topbar-logo-mark">
          <BookOpen size={13} color="#fff" strokeWidth={2} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
          StudyPlanner
        </span>
      </div>
      <button
        className="btn btn-ghost btn-sm"
        onClick={onLogout}
        id="topbar-logout"
        style={{ gap: 6 }}
      >
        <LogOut size={13} />
        Log out
      </button>
    </header>
  );
}

export default TopBar;
