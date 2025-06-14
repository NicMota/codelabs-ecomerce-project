import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();


  if(!user || user.role != "ADMIN")
  {
    return <Navigate to="/urnotadmin" replace />;
  }

  return children;
}