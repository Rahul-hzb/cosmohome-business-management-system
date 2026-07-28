"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentAdmin,
  login as loginService,
  logout as logoutService,
} from "@/lib/services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await getCurrentAdmin();
      setAdmin(res.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

const login = async (email, password) => {
  console.log("1. Calling login API");

  const loginRes = await loginService(email, password);
  console.log("2. Login response:", loginRes);

  console.log("3. Calling /auth/me");

  const res = await getCurrentAdmin();

  console.log("4. /auth/me response:", res);

  setAdmin(res.admin);

  return res.admin;
};



  const logout = async () => {
    await logoutService();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        refresh,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
