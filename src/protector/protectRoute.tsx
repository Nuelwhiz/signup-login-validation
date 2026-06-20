// 1. Create a custom hook/context (e.g., useAuth) to manage your actual auth state
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext"; // Hypothetical auth provider

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Handle the time it takes to verify the token on page load
  if (isLoading) {
    return <div>Loading...</div>; // Or a nice spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
