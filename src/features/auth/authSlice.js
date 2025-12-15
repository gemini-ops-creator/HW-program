import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login as authLogin,
  logout as authLogout,
  register as authRegister,
  subscribeToAuthChanges,
} from "../../services/authService.js";
import { getUser, saveUser } from "../../services/userRepository.js";

const parseUser = firebaseUser =>
  firebaseUser
    ? {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      }
    : null;

const initialState = {
  user: null,
  status: "idle",
  error: null,
  initialized: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authLogin(email, password);
      const user = parseUser(result.user);
      const existing = await getUser(user.uid);
      if (!existing) {
        await saveUser(result.user);
      }
      return user;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await authRegister(email, password);
      await saveUser(result.user);
      return parseUser(result.user);
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authLogout();
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

export const initAuthListener = () => dispatch => {
  let isFirstCall = true;
  const unsubscribe = subscribeToAuthChanges(async currentUser => {
    try {
      const parsed = parseUser(currentUser);
      if (parsed) {
        const existing = await getUser(parsed.uid);
        if (!existing) {
          await saveUser(currentUser);
        }
      }
      dispatch(authStateChanged(parsed));
    } catch (err) {
      dispatch(setAuthError(err.message || "Auth state error"));
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
    authStateChanged(state, action) {
      state.user = action.payload;
      state.error = null;
      state.status = "idle";
      state.initialized = true;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
    setInitialized(state, action) {
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
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      });
  },
});

export const { authStateChanged, setAuthError, setInitialized } =
  authSlice.actions;

export const selectUser = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthError = state => state.auth.error;
export const selectAuthInitialized = state => state.auth.initialized;
export const selectAuthLoading = state => state.auth.status === "loading";

export default authSlice.reducer;
