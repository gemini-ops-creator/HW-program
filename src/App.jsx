import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter.jsx";
import { listenToAuthChanges } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(listenToAuthChanges());
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
