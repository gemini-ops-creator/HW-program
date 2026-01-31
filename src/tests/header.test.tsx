import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/Header/Header";
import { renderWithProviders } from "./test-utils";
import type { RootState } from "../store/store";

describe("Header", () => {
  it("shows total cart quantity in the cart button", () => {
    const preloadedState: RootState = {
      auth: {
        user: null,
        loading: false,
        error: null,
      },
      cart: {
        items: [
          {
            id: "meal-1",
            name: "Burger",
            price: 9.5,
            quantity: 2,
          },
          {
            id: "meal-2",
            name: "Salad",
            price: 7.0,
            quantity: 3,
          },
        ],
      },
      menu: {
        items: [],
        loading: false,
        error: null,
      },
    };

    renderWithProviders(<Header />, { preloadedState });

    expect(
      screen.getByLabelText("Shopping cart with 5 items")
    ).toBeInTheDocument();
  });
});
