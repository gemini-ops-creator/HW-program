import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { initAuthListener } from "./features/auth/authSlice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

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
