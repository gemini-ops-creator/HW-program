import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
import type { CartItem } from "../cart/cartSlice";
import { createOrder } from "../../services/orderService";
import type { RootState } from "../../store";

type Address = {
  street: string;
  house: string;
};

type OrderStatus = "idle" | "loading" | "succeeded" | "failed";

type OrderState = {
  address: Address;
  status: OrderStatus;
  error: string | null;
  lastOrderId: string | null;
};

type SubmitOrderArgs = {
  items: CartItem[];
  address: Address;
};

type SubmitOrderResult = {
  orderId: string;
};

const initialState: OrderState = {
  address: {
    street: "",
    house: "",
  },
  status: "idle",
  error: null,
  lastOrderId: null,
};

export const submitOrder = createAsyncThunk<
  SubmitOrderResult,
  SubmitOrderArgs,
  { state: RootState; rejectValue: string }
>(
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
      const message =
        err instanceof Error ? err.message : "Failed to place order";
      return rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddressField: (
      state,
      action: PayloadAction<{ field: keyof Address; value: string }>
    ) => {
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
        state.error =
          action.payload ?? action.error.message ?? "Failed to place order";
      });
  },
});

export const { setAddressField, resetOrderState } = orderSlice.actions;

export const selectOrderAddress = (state: RootState) => state.order.address;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;
export const selectLastOrderId = (state: RootState) => state.order.lastOrderId;

export default orderSlice.reducer;
