import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingState from "./LoadingState.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingState label="Checking your session" full />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
}
