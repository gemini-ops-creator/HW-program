import { describe, expect, it } from "vitest";
import cartReducer, {
  addToCart,
  clearCart,
  removeItem,
  updateQuantity,
  type CartItem,
} from "../store/cartSlice";

describe("cartSlice", () => {
  const baseItem: Omit<CartItem, "quantity"> = {
    id: "meal-1",
    name: "Burger",
    price: 9.5,
    image: "/burger.png",
  };

  it("adds a new item to the cart", () => {
    const state = cartReducer(
      { items: [] },
      addToCart({ item: baseItem, quantity: 2 })
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      id: "meal-1",
      name: "Burger",
      price: 9.5,
      quantity: 2,
    });
  });

  it("increases quantity when the item already exists", () => {
    const initialState = {
      items: [{ ...baseItem, quantity: 1 }],
    };

    const state = cartReducer(
      initialState,
      addToCart({ item: baseItem, quantity: 3 })
    );

    expect(state.items[0].quantity).toBe(4);
  });

  it("updates quantity for an existing item", () => {
    const initialState = {
      items: [{ ...baseItem, quantity: 1 }],
    };

    const state = cartReducer(
      initialState,
      updateQuantity({ id: "meal-1", quantity: 5 })
    );

    expect(state.items[0].quantity).toBe(5);
  });

  it("ignores updateQuantity when item is missing", () => {
    const initialState = {
      items: [{ ...baseItem, quantity: 1 }],
    };

    const state = cartReducer(
      initialState,
      updateQuantity({ id: "missing", quantity: 5 })
    );

    expect(state.items[0].quantity).toBe(1);
  });

  it("removes an item by id", () => {
    const initialState = {
      items: [{ ...baseItem, quantity: 1 }],
    };

    const state = cartReducer(initialState, removeItem("meal-1"));

    expect(state.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const initialState = {
      items: [{ ...baseItem, quantity: 1 }],
    };

    const state = cartReducer(initialState, clearCart());

    expect(state.items).toEqual([]);
  });
});
