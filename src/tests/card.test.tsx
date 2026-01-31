import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "../components/Card/Card";
import { renderWithProviders } from "./test-utils";

describe("Card", () => {
  it("adds item with selected quantity to the cart", () => {
    const { store } = renderWithProviders(
      <Card
        id="meal-1"
        name="Pizza"
        description="Cheesy"
        image="/pizza.png"
        price="12.50"
      />
    );

    const quantityInput = screen.getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(quantityInput).toHaveValue(3);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    const items = store.getState().cart.items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: "meal-1",
      name: "Pizza",
      quantity: 3,
      price: 12.5,
      image: "/pizza.png",
    });
  });

  it("keeps quantity at 1 when input is invalid or zero", () => {
    renderWithProviders(
      <Card
        id="meal-2"
        name="Pasta"
        description="Creamy"
        image="/pasta.png"
        price={8}
      />
    );

    const quantityInput = screen.getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: "0" } });

    expect(quantityInput).toHaveValue(1);
  });

  it("uses 0 when price is empty", () => {
    const { store } = renderWithProviders(
      <Card
        id="meal-3"
        name="Soup"
        description="Warm"
        image="/soup.png"
        price=""
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    const items = store.getState().cart.items;
    expect(items[0].price).toBe(0);
  });
});
