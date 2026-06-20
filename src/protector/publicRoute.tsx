import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/DashBordLayout" replace />;
  }

  return children;
};

export default PublicRoute;
