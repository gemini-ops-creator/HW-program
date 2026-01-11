import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { fetchMeals } from "../../services/ApiService";
import type { Meal } from "../../services/ApiService";

export const categories = ["Dessert", "Dinner", "Breakfast"] as const;
export type Category = (typeof categories)[number];

type MenuStatus = "idle" | "loading" | "succeeded" | "failed";

type MenuState = {
  items: Meal[];
  status: MenuStatus;
  error: string | null;
  displayLimit: number;
  activeCategory: Category;
};

const initialState: MenuState = {
  items: [],
  status: "idle",
  error: null,
  displayLimit: 6,
  activeCategory: categories[0],
};

export const loadMeals = createAsyncThunk<
  Meal[],
  void,
  { rejectValue: string }
>("menu/loadMeals", async (_, { rejectWithValue }) => {
  try {
    return await fetchMeals();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to load menu items";
    return rejectWithValue(message);
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<Category>) => {
      state.activeCategory = action.payload;
    },
    increaseDisplayLimit: (state, action: PayloadAction<number>) => {
      state.displayLimit += action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadMeals.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to load menu items";
      });
  },
});

export const { setActiveCategory, increaseDisplayLimit } = menuSlice.actions;

export const selectMenuItems = (state: RootState) => state.menu.items;
export const selectMenuStatus = (state: RootState) => state.menu.status;
export const selectMenuError = (state: RootState) => state.menu.error;
export const selectActiveCategory = (state: RootState) =>
  state.menu.activeCategory;
export const selectDisplayLimit = (state: RootState) => state.menu.displayLimit;

export default menuSlice.reducer;
