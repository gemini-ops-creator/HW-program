import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "src/store/cartSlice.ts",
        "src/pages/Order/OrderPage.tsx",
        "src/components/Card/Card.tsx",
        "src/components/Header/Header.tsx",
        "src/components/CartButton/CartButton.tsx",
      ],
      thresholds: {
        lines: 80,
        functions: 70,
        statements: 80,
        branches: 80,
      },
    },
  },
});
