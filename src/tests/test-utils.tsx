import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import menuReducer from "../store/menuSlice";
import type { RootState } from "../store/store";

type PreloadedState = RootState;

export const setupStore = (preloadedState?: PreloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      menu: menuReducer,
    },
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;

type ExtendedRenderOptions = Omit<RenderOptions, "queries"> & {
  preloadedState?: PreloadedState;
  store?: AppStore;
  route?: string;
};

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
