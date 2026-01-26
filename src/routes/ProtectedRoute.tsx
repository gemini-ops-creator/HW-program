import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function ProtectedRoute() {
  const { user, loading } = useAppSelector(state => state.auth);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
