import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../providers/auth-provider";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
