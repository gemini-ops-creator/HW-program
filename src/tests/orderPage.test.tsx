import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OrderPage from "../pages/Order/OrderPage";
import { renderWithProviders } from "./test-utils";
import type { RootState } from "../store/store";

describe("OrderPage", () => {
  it("shows empty state when cart has no items", () => {
    const preloadedState: RootState = {
      auth: { user: null, loading: false, error: null },
      cart: { items: [] },
      menu: { items: [], loading: false, error: null },
    };

    renderWithProviders(<OrderPage />, { preloadedState });

    expect(
      screen.getByText(
        "Your cart is empty. Add something tasty to get started."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to menu/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /back to home/i })
    ).toBeInTheDocument();
  });

  it("renders items, total, and allows quantity update and removal", () => {
    const preloadedState: RootState = {
      auth: { user: null, loading: false, error: null },
      cart: {
        items: [
          {
            id: "meal-1",
            name: "Burger",
            price: 10,
            quantity: 2,
          },
          {
            id: "meal-2",
            name: "Salad",
            price: 5,
            quantity: 1,
          },
        ],
      },
      menu: { items: [], loading: false, error: null },
    };

    const { store } = renderWithProviders(<OrderPage />, { preloadedState });

    expect(screen.getByText("$25.00")).toBeInTheDocument();

    const quantityInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(quantityInputs[0], { target: { value: "3" } });

    expect(store.getState().cart.items[0].quantity).toBe(3);

    fireEvent.click(screen.getByLabelText("Remove Burger from cart"));

    expect(store.getState().cart.items).toHaveLength(1);
  });

  it("does not update quantity when input is invalid or zero", () => {
    const preloadedState: RootState = {
      auth: { user: null, loading: false, error: null },
      cart: {
        items: [
          {
            id: "meal-1",
            name: "Burger",
            price: 10,
            quantity: 2,
          },
        ],
      },
      menu: { items: [], loading: false, error: null },
    };

    const { store } = renderWithProviders(<OrderPage />, { preloadedState });

    const quantityInput = screen.getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: "0" } });

    expect(store.getState().cart.items[0].quantity).toBe(2);
    expect(quantityInput).toHaveValue(2);
  });

  it("submitting the form clears the cart", () => {
    const preloadedState: RootState = {
      auth: { user: null, loading: false, error: null },
      cart: {
        items: [
          {
            id: "meal-1",
            name: "Burger",
            price: 10,
            quantity: 2,
          },
        ],
      },
      menu: { items: [], loading: false, error: null },
    };

    const { store } = renderWithProviders(<OrderPage />, { preloadedState });

    const orderButton = screen.getByRole("button", { name: /order/i });
    const form = orderButton.closest("form");
    expect(form).not.toBeNull();
    if (form) {
      fireEvent.submit(form);
    }

    expect(store.getState().cart.items).toHaveLength(0);
  });
});
