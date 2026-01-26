import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  login as authLogin,
  subscribeToAuthChanges,
} from "../services/authService";
import type { AppDispatch } from "./store";

type AuthState = {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  loading: boolean;
  error: string | null;
};

export const login = createAsyncThunk<
  boolean,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    await authLogin(email, password);
    return true;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to log in"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error =
          action.payload || action.error.message || "Failed to log in";
      });
  },
});

export const listenToAuthChanges =
  () =>
  (dispatch: AppDispatch): (() => void) => {
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
