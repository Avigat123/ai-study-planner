import { useState } from "react";
import { Eye, EyeOff, Check, BookOpen } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://ai-study-planner-iktk.onrender.com";

const BENEFITS = [
  "Personalized study schedules built around your deadline",
  "AI-powered planning that adapts to your learning pace",
  "Smart rescheduling when life gets in the way",
  "Progress tracking across all your active plans",
];

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e?.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const url = isLogin ? "/auth/login" : "/auth/signup";
      const res = await axios.post(`${BASE_URL}${url}`, { email, password });

      // Store token + email for welcome message
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      setToken(res.data.token);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (isLogin ? "Invalid email or password." : "Could not create account.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-shell">
      {/* ── Brand Panel ───────────────────────────────────────── */}
      <div className="auth-brand">
        <div className="auth-brand-grid" />
        <div className="auth-brand-content">
          <div className="auth-brand-logo">
            <div className="auth-brand-mark">
              <BookOpen size={18} color="#fff" strokeWidth={2} />
            </div>
            <span className="auth-brand-name">StudyPlanner</span>
          </div>

          <p className="auth-brand-tagline">
            Turn any learning goal into a realistic study roadmap.
          </p>

          <ul className="auth-brand-benefits">
            {BENEFITS.map((benefit, i) => (
              <li key={i} className="auth-benefit-item">
                <span className="auth-benefit-icon">
                  <Check size={11} strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Form Panel ────────────────────────────────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <h1 className="auth-form-heading">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="auth-form-sub">
            {isLogin
              ? "Sign in to view your study plans and track progress."
              : "Get started by creating a free account."}
          </p>

          {error && (
            <div className="auth-error-banner" role="alert">
              {error}
            </div>
          )}

          <form className="auth-form-fields" onSubmit={handleAuth} noValidate>
            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="auth-email">
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="auth-password">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder={isLogin ? "Enter your password" : "Min. 6 characters"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading}
              id="auth-submit"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : isLogin ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="auth-switch-link" onClick={switchMode} type="button">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
