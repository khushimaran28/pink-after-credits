import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEV_MODE = false;

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  //DEV MODE BYPASS
  if (DEV_MODE) {
    return children;
  }

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return children;
}