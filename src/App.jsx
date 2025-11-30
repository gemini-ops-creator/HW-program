import React from "react";
import "./App.css";
import HomePage from "./pages/Home/HomePage.jsx";
import Menu from "./pages/Menu/MenuPage.jsx";
import { AppProvider, useAppContext } from "./context/AppContext.jsx";

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { currentPage } = useAppContext();

  return (
    <div className="App">
      {currentPage === "home" && <HomePage />}
      {currentPage === "menu" && <Menu />}
    </div>
  );
}

export default App;
