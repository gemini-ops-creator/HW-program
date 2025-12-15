import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice.js";
import { createOrder } from "../../services/orderService.js";

const initialState = {
  address: {
    street: "",
    house: "",
  },
  status: "idle",
  error: null,
  lastOrderId: null,
};

export const submitOrder = createAsyncThunk(
  "order/submit",
  async ({ items, address }, { dispatch, getState, rejectWithValue }) => {
    if (!items.length) {
      return rejectWithValue("Your cart is empty");
    }
    if (!address.street || !address.house) {
      return rejectWithValue("Please fill in street and house");
    }

    const userId = getState().auth.user?.uid;

    try {
      const result = await createOrder({ items, address, userId });
      dispatch(clearCart());
      return { orderId: result.id || result.orderId || "created" };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to place order");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddressField: (state, action) => {
      const { field, value } = action.payload;
      state.address[field] = value;
    },
    resetOrderState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(submitOrder.pending, state => {
        state.status = "loading";
        state.error = null;
        state.lastOrderId = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.lastOrderId = action.payload.orderId;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setAddressField, resetOrderState } = orderSlice.actions;

export const selectOrderAddress = state => state.order.address;
export const selectOrderStatus = state => state.order.status;
export const selectOrderError = state => state.order.error;
export const selectLastOrderId = state => state.order.lastOrderId;

export default orderSlice.reducer;
