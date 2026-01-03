import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { apiRequest } from "../utils/api";
import PageTransition from "../components/PageTransition";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [stage, setStage] = useState("form");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const MIN_PASSWORD_LENGTH = 6;

  const validate = () => {
    if (!email) {
      return "Email is required.";
    }

    if (!isValidEmail(email)) {
      return "That doesn't look like a valid email.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return "Password should be at least 6 characters.";
    }

    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      login(data.token, data.user, rememberMe);
      setStage("welcome");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <PageTransition>
    <div className="auth">
      {/* LEFT BRAND SIDE */}
      <div className="auth__brand">
        <h1>Pink After Credits</h1>
        <p className="auth__tagline">movies, but make it personal</p>
        <p className="auth__line">Good taste requires an account.</p>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className={`auth__card ${stage === "welcome" ? "auth__card--exit" : ""}`}>
        {stage === "form" && (
          <>
            <h2>Welcome Back, Gorgeous</h2>

            <form className="auth__form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="auth__password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="auth__eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <label className="auth__remeber">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>

              {error && <p className="auth__error">{error}</p>}

              <button type="submit">Log In</button>
            </form>

            <p className="auth__switch">
              First time? Let's fix that. <Link to="/signup">Sign up</Link>
            </p>

            <p className="auth__footer">
              A safe space for good taste, big feelings, and curated chaos.
            </p>
          </>
        )}

        {stage === "welcome" && (
          <div className="auth__welcome">
            <p>Welcome back.</p>
            <span>You've been missed.</span>
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
}