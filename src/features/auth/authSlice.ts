import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import {
  login as authLogin,
  logout as authLogout,
  register as authRegister,
  subscribeToAuthChanges,
} from "../../services/authService";
import { getUser, saveUser } from "../../services/userRepository";
import type { AppDispatch, RootState } from "../../store";

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
  initialized: boolean;
};

const parseUser = (firebaseUser: User | null): AuthUser | null =>
  firebaseUser
    ? {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      }
    : null;

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  initialized: false,
};

export const login = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const result = await authLogin(email, password);
    const user = parseUser(result.user);
    if (!user) {
      throw new Error("User not found");
    }
    const existing = await getUser(user.uid);
    if (!existing) {
      await saveUser(result.user);
    }
    return user;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    return rejectWithValue(message);
  }
});

export const register = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/register", async ({ email, password }, { rejectWithValue }) => {
  try {
    const result = await authRegister(email, password);
    await saveUser(result.user);
    const user = parseUser(result.user);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return rejectWithValue(message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authLogout();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      return rejectWithValue(message);
    }
  }
);

export const initAuthListener = () => (dispatch: AppDispatch) => {
  let isFirstCall = true;
  const unsubscribe = subscribeToAuthChanges(async currentUser => {
    try {
      const parsed = parseUser(currentUser);
      if (currentUser && parsed) {
        const existing = await getUser(parsed.uid);
        if (!existing) {
          await saveUser(currentUser);
        }
      }
      dispatch(authStateChanged(parsed));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Auth state error";
      dispatch(setAuthError(message));
    } finally {
      if (isFirstCall) {
        isFirstCall = false;
        dispatch(setInitialized(true));
      }
    }
  });

  return unsubscribe;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateChanged(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.error = null;
      state.status = "idle";
      state.initialized = true;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Login failed";
      })
      .addCase(register.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Registration failed";
      })
      .addCase(logout.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.status = "idle";
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Logout failed";
      });
  },
});

export const { authStateChanged, setAuthError, setInitialized } =
  authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthInitialized = (state: RootState) =>
  state.auth.initialized;
export const selectAuthLoading = (state: RootState) =>
  state.auth.status === "loading";

export default authSlice.reducer;
