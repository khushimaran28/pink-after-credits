import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEV_MODE = false;

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // DEV MODE: bypass auth completely
  if (DEV_MODE) {
    return children;
  }

  // While checking auth, show nothing but avoid crash/flash
  if (loading) {
    return (
      <div style={{ padding: "120px", textAlign: "center", color: "#d74774" }}>
        Loading...
      </div>
    );
  }

  // Not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return children;
}