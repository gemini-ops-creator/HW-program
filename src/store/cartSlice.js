import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const { item, quantity = 1 } = action.payload;
      const existing = state.items.find(entry => entry.id === item.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existing = state.items.find(entry => entry.id === id);
      if (existing) {
        existing.quantity = quantity;
      }
    },
    removeItem(state, action) {
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
