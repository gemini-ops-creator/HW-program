import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import {
  selectAuthInitialized,
  selectAuthLoading,
  selectUser,
} from "../features/auth/authSlice";
import { useAppSelector } from "../store/hooks";

type ProtectedRouteProps = {
  children: ReactElement;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const initialized = useAppSelector(selectAuthInitialized);

  if (!initialized || loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
