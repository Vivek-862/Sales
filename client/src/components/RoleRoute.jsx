import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../providers/auth-provider";

export default function RoleRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/" />;

  return children;
}
