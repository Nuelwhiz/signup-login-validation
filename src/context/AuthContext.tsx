import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// 1. Define the shape of our Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null; // Replace 'any' with your User type/interface
  isLoading: boolean;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

// 2. Create the Context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for token on initial app load
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // OPTIONAL: You can make an API call here to validate the token
          // and fetch the latest user data. For this example, we'll assume it's valid.

          // const response = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
          // const userData = await response.json();

          setIsAuthenticated(true);
          // setUser(userData);
        } catch (error) {
          console.error("Auth initialization failed", error);
          logout();
        }
      }

      // Turn off loading state once the check is complete
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Handle Login
  const login = (token: string, userData: any) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Handle Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create a custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
