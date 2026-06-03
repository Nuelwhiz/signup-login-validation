import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
