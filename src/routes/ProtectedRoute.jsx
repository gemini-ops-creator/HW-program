import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthInitialized,
  selectAuthLoading,
  selectUser,
} from "../features/auth/authSlice.js";

function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const initialized = useSelector(selectAuthInitialized);

  if (!initialized || loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
