import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

const initialState = {
  items: [] as CartItem[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        item: Omit<CartItem, "quantity">;
        quantity?: number;
      }>
    ) {
      const { item, quantity = 1 } = action.payload;
      const existing = state.items.find(entry => entry.id === item.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existing = state.items.find(entry => entry.id === id);
      if (existing) {
        existing.quantity = quantity;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(entry => entry.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
