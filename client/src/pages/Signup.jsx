import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { apiRequest } from "../utils/api";
import PageTransition from "../components/PageTransition";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const MIN_PASSWORD_LENGTH = 6;

  const validate = () => {
    if (!email) return "Email is required.";
    if (!isValidEmail(email)) return "That doesn't look like a valid email.";
    if (!password) return "Password is required.";
    if (password.length < MIN_PASSWORD_LENGTH)
      return "Password should be at least 6 characters.";
    if (!confirmPassword) return "Please confirm your password.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await apiRequest("/auth/signup", "POST", {
        email,
        password,
      });

      login(data.token, data.user);
      navigate("/");
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
        <div className="auth__card">
          <h2>Join the Pink Side</h2>

          <form className="auth__form" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {password && password.length < 6 && (
              <p className="auth__hint">
                Password should be at least 6 characters.
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="auth__error">{error}</p>}

            <button type="submit">Sign Up</button>
          </form>

          <p className="auth__switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <p className="auth__footer">
            A safe space for good taste, big feelings, and curated chaos.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}