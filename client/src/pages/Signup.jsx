import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Signup() {
  return (
    <div className="auth">
      {/* LEFT BRAND SIDE */}
      <div className="auth__brand">
        <h1>Pink After Credits</h1>
        <p className="auth__tagline">
          movies, but make it personal
        </p>
        <p className="auth__line">
          Good taste requires an account.
        </p>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="auth__card">
        <h2>Join the Chaos</h2>

        <form className="auth__form">
          <input
            type="email"
            placeholder="Email"
            disabled
          />
          <input
            type="password"
            placeholder="Password"
            disabled
          />
          <input
            type="password"
            placeholder="Confirm Password"
            disabled
          />

          <button type="button">Create Account</button>
        </form>

        <p className="auth__switch">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>

        <p className="auth__footer">
          A safe space for good taste, big feelings, and curated chaos.
        </p>
      </div>
    </div>
  );
}