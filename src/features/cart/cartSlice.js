import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, price = 0, image, quantity = 1 } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.quantity += quantity;
        return;
      }
      state.items.push({ id, name, price, image, quantity });
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectCartCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
