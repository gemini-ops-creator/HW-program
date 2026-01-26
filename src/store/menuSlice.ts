import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

export type MenuItem = {
  id: string;
  meal: string;
  instructions: string;
  img?: string;
  price: number | string;
  category: string;
};

export const fetchMeals = createAsyncThunk<
  MenuItem[],
  void,
  { rejectValue: string }
>("menu/fetchMeals", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE}/meals`);
    if (!response.ok) {
      throw new Error("Failed to load menu items");
    }
    return (await response.json()) as MenuItem[];
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to load menu items"
    );
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [] as MenuItem[],
    loading: false,
    error: null as string | null,
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
        state.error =
          action.payload || action.error.message || "Failed to load menu items";
      });
  },
});

export default menuSlice.reducer;
