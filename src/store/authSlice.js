import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login as authLogin,
  subscribeToAuthChanges,
} from "../services/authService.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await authLogin(email, password);
      return true;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to log in");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const listenToAuthChanges = () => dispatch => {
  dispatch(setLoading(true));
  const unsubscribe = subscribeToAuthChanges(currentUser => {
    dispatch(
      setUser(
        currentUser
          ? {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
            }
          : null
      )
    );
    dispatch(setLoading(false));
  });
  return unsubscribe;
};

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
