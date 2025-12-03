import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import {
  login as authLogin,
  logout as authLogout,
  register as authRegister,
  subscribeToAuthChanges,
} from "../services/authService.js";
import { getUser, saveUser } from "../services/userRepository.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async currentUser => {
      setUser(
        currentUser
          ? {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
            }
          : null
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        setError(null);
        const result = await authLogin(email, password);
        const { user: firebaseUser } = result;
        const existing = await getUser(firebaseUser.uid);
        if (!existing) {
          await saveUser(firebaseUser);
        }
        return result;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [setError]
  );

  const register = useCallback(
    async (email, password) => {
      try {
        setError(null);
        const result = await authRegister(email, password);
        const { user: firebaseUser } = result;
        await saveUser(firebaseUser);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [setError]
  );

  const logout = useCallback(() => {
    setError(null);
    return authLogout();
  }, [setError]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      setError,
      login,
      register,
      logout,
    }),
    [user, loading, error, login, register, logout, setError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
