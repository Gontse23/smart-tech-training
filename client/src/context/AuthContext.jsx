import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch, clearToken, getStoredToken, storeToken } from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getStoredToken()));
  const [error, setError] = useState("");

  const loadUser = useCallback(async () => {
    const stored = getStoredToken();
    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const data = await apiFetch("/api/auth/me", { token: stored });
      setToken(stored);
      setUser(data.user);
    } catch {
      clearToken();
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    setError("");
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: { email, password }
    });
    storeToken(data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (form) => {
    setError("");
    const data = await apiFetch("/api/auth/register", {
      method: "POST",
      body: form
    });
    storeToken(data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      error,
      setError,
      setUser,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token && user)
    }),
    [token, user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
