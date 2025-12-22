import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/User";
import type { AuthData } from "../types/AuthData";
import { loginApi, logoutApi, meApi, registerApi } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meApi()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);


  const register = async (data: AuthData) => {
    const user = await registerApi(data);
    setUser(user);
  };

  const login = async (data: AuthData) => {
    const user = await loginApi(data);
    setUser(user);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
