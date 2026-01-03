import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth">
      {/* LEFT BRAND SIDE */}
      <div className="auth__brand">
        <h1>Pink After Credits</h1>
        <p className="auth__tagline">movies, but make it personal</p>
        <p className="auth__line">Good taste requires an account.</p>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="auth__card">
        <h2>Welcome Back, Gorgeous</h2>

        <form className="auth__form" onSubmit={handleLogin}>
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

          {error && <p className="auth__error">{error}</p>}

          <button type="submit">Log In</button>
        </form>

        <p className="auth__switch">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

        <p className="auth__footer">
          A safe space for good taste, big feelings, and curated chaos.
        </p>
      </div>
    </div>
  );
}