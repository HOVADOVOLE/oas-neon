import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "authToken";
const EXPIRATION_TIME = 20 * 60 * 1000; // 20 minut v milisekundách

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const lastActivity = localStorage.getItem(`${TOKEN_KEY}_lastActivity`);

    if (token && lastActivity) {
      const isValid = Date.now() - parseInt(lastActivity, 10) < EXPIRATION_TIME;
      if (isValid) {
        return true;
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(`${TOKEN_KEY}_lastActivity`);
      }
    }
    return false;
  });

  const navigate = useNavigate();

  const checkAuthentication = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const lastActivity = localStorage.getItem(`${TOKEN_KEY}_lastActivity`);

    if (token && lastActivity) {
      const isValid = Date.now() - parseInt(lastActivity, 10) < EXPIRATION_TIME;
      setIsAuthenticated(isValid);

      if (!isValid) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(`${TOKEN_KEY}_lastActivity`);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const updateLastActivity = () => {
    if (isAuthenticated) {
      localStorage.setItem(`${TOKEN_KEY}_lastActivity`, Date.now().toString());
    }
  };

  useEffect(() => {
    // Kontrola při načtení stránky
    checkAuthentication();

    // Nastavení posluchače pro aktivity uživatele
    const handleActivity = () => updateLastActivity();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [isAuthenticated]);

  const login = () => {
    localStorage.setItem(TOKEN_KEY, "user_token");
    localStorage.setItem(`${TOKEN_KEY}_lastActivity`, Date.now().toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(`${TOKEN_KEY}_lastActivity`);
    setIsAuthenticated(false);
    navigate("/login"); // Přesměrování na login při odhlášení
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
