import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage.jsx";
import MenuPage from "../pages/Menu/MenuPage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import OrderPage from "../pages/Order/OrderPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

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
