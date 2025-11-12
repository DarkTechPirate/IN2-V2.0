import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosBase, { AxiosInstance } from "axios";
import { registerAccessTokenGetter } from "../services/api";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

/* =========================
   Types
========================= */
export type Role = "customer" | "seller" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profilePic?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  axios: AxiosInstance;

  loginWithCredentials: (email: string, password: string) => Promise<User>;
  signupWithCredentials: (name: string, email: string, password: string) => Promise<User>;
  loginWithGoogle: (idToken: string) => Promise<User>;
  loginAsAdmin: (email: string, password: string) => Promise<User>;
  fetchMe: () => Promise<User | null>;
  logout: () => void;

  setSession: (accessToken: string | null, refreshToken?: string | null, user?: User | null) => void;
}

/* =========================
   Storage Keys
========================= */
const LS_REFRESH = "refreshToken";
const LS_USER = "user";

/* =========================
   Context
========================= */
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null); // ⚡ in-memory only
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getRefreshToken = () => localStorage.getItem(LS_REFRESH);

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem(LS_REFRESH);
    localStorage.removeItem(LS_USER);
    setUser(null);
  };

  /** =========================
   * Axios with Auto-Refresh
   ========================= */
  const axios = useMemo(() => {
    const instance = axiosBase.create({
      baseURL: BACKEND_URL,
      withCredentials: false,
    });

    instance.interceptors.request.use((config) => {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err?.response?.status === 401) {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            logout();
            return Promise.reject(err);
          }

          try {
            const refreshRes = await axiosBase.post(`${BACKEND_URL}/api/auth/refresh-token`, { refreshToken });
            const newAccess = refreshRes.data.accessToken;
            setAccessToken(newAccess);

            // Retry the original request
            err.config.headers.Authorization = `Bearer ${newAccess}`;
            return instance(err.config);
          } catch {
            logout();
          }
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, [accessToken]);

  /** =========================
   * Session Management
   ========================= */
  const setSession = (accessToken: string | null, refreshToken?: string | null, u?: User | null) => {
    setAccessToken(accessToken);

    if (refreshToken !== undefined) {
      if (refreshToken) localStorage.setItem(LS_REFRESH, refreshToken);
      else localStorage.removeItem(LS_REFRESH);
    }

    if (u) {
      localStorage.setItem(LS_USER, JSON.stringify(u));
      setUser(u);
    } else {
      localStorage.removeItem(LS_USER);
      setUser(null);
    }
  };

  /** =========================
   * Auth Methods
   ========================= */
  const loginWithCredentials = async (email: string, password: string) => {
    const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
    const { accessToken: at, refreshToken: rt, user } = res.data;
    setSession(at, rt, user);
    return user;
  };

  const signupWithCredentials = async (name: string, email: string, password: string) => {
    const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, { name, email, password });
    const { accessToken: at, refreshToken: rt, user } = res.data;
    setSession(at, rt, user);
    return user;
  };

  const loginWithGoogle = async (idToken: string) => {
    const res = await axios.post(`${BACKEND_URL}/api/auth/google`, { idToken });
    const { accessToken: at, refreshToken: rt, user } = res.data;
    setSession(at, rt, user);
    return user;
  };

  const loginAsAdmin = async (email: string, password: string) => {
    const res = await axios.post(`${BACKEND_URL}/api/auth/admin/login`, { email, password });
    const { accessToken: at, refreshToken: rt, user } = res.data;

    if (user.role !== "admin") {
      throw new Error("Access denied: not an admin");
    }

    setSession(at, rt, user);
    return user;
  };

  const fetchMe = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/user/profile`);
    const u: User = res.data.user;
    setSession(accessToken, getRefreshToken(), u);
    return u;
  };

  /** =========================
   * Restore Session
   ========================= */
  useEffect(() => {
    const boot = async () => {
      const storedUser = localStorage.getItem(LS_USER);
      const refreshToken = getRefreshToken();

      if (refreshToken && storedUser) {
        try {
          const res = await axiosBase.post(`${BACKEND_URL}/api/auth/refresh-token`, { refreshToken });
          const newAccess = res.data.accessToken;
          setAccessToken(newAccess);
          setUser(JSON.parse(storedUser));
        } catch {
          logout();
        }
      }

      setLoading(false);
    };

    boot();
  }, []);

  /** 🔥 Register Access Token Getter for ApiService */
  useEffect(() => {
    registerAccessTokenGetter(() => accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        loading,
        axios,
        loginWithCredentials,
        signupWithCredentials,
        loginWithGoogle,
        loginAsAdmin,
        fetchMe,
        logout,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
