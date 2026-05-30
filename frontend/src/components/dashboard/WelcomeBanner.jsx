function WelcomeBanner({ userEmail, plans }) {
  // Compute a short display name from email
  const displayName = userEmail
    ? userEmail.split("@")[0]
    : "there";

  const activePlans = plans.filter((p) => {
    const completed = p.plan.filter((t) => t.completed).length;
    return completed < p.plan.length;
  });

  const latestPlan = plans[0];
  const subText = latestPlan
    ? (() => {
        const total = latestPlan.plan.length;
        const done = latestPlan.plan.filter((t) => t.completed).length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        const deadline = new Date(latestPlan.deadline);
        const daysLeft = Math.max(
          0,
          Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24))
        );
        return `${pct}% through your ${latestPlan.subject} roadmap · ${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining`;
      })()
    : activePlans.length === 0
    ? "No active plans. Create one to get started."
    : `${activePlans.length} active plan${activePlans.length !== 1 ? "s" : ""} in progress.`;

  return (
    <div className="welcome-banner">
      <h1 className="welcome-title">
        Welcome back,{" "}
        <span style={{ color: "var(--primary)" }}>{displayName}</span>
      </h1>
      <p className="welcome-subtitle">{subText}</p>
    </div>
  );
}

export default WelcomeBanner;
