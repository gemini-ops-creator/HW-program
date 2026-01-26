import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import MenuPage from "../pages/Menu/MenuPage";
import LoginPage from "../pages/Login/LoginPage";
import OrderPage from "../pages/Order/OrderPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/order" element={<OrderPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
