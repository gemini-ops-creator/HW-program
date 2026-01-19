/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const prefersDarkQuery = "(prefers-color-scheme: dark)";

const getSystemTheme = (): Theme =>
  window.matchMedia(prefersDarkQuery).matches ? "dark" : "light";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }
  return getSystemTheme();
};

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const root = document.documentElement;
    root.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
