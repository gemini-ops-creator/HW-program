import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

export const fetchMeals = createAsyncThunk(
  "menu/fetchMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE}/meals`);
      if (!response.ok) {
        throw new Error("Failed to load menu items");
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load menu items");
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMeals.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default menuSlice.reducer;
