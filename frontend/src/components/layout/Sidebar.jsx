import { BookOpen, LayoutDashboard, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
];

function Sidebar({ activeNav = "dashboard", onNavChange, onLogout, userEmail }) {
  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : "SP";

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <BookOpen size={15} color="#fff" strokeWidth={2} />
        </div>
        <span className="sidebar-logo-text">StudyPlanner</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            className={`nav-item${activeNav === id ? " active" : ""}`}
            onClick={() => onNavChange?.(id)}
            id={`nav-${id}`}
          >
            <Icon size={16} strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initials}</div>
          <span className="sidebar-user-email" title={userEmail}>
            {userEmail}
          </span>
        </div>
        <button
          className="btn-logout"
          onClick={onLogout}
          id="sidebar-logout"
        >
          <LogOut size={15} strokeWidth={1.75} />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
