import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../features/store";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
