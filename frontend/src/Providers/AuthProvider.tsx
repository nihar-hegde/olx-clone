import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false after checking
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    await axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
