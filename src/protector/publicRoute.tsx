import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../store/store";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  // If user is already logged in → block login/signup pages
  if (user) {
    return <Navigate to="/LayoutDashBord" replace />;
  }

  return children;
};

export default PublicRoute;
