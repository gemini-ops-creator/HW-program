import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import AppRouter from "./routes/AppRouter.jsx";
import { initAuthListener } from "./features/auth/authSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(initAuthListener());
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
