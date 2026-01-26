import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { listenToAuthChanges } from "./store/authSlice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

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
