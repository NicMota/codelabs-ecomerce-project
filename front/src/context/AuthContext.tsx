import {createContext, useContext,useEffect,useState, type ReactNode} from 'react';
type User = {
    name:string;
    role:"ADMIN" | "USER";
    token:string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) return null;
    
    const parsedUser = JSON.parse(storedAuth);
    if (new Date(parsedUser.expiry) < new Date()) {
      localStorage.removeItem("auth"); // Clear expired token
      return null;
    }
    return parsedUser;
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth" && !e.newValue) {
        setUser(null); 
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function login(userData: User) {
    setUser(userData);
    localStorage.setItem("auth", JSON.stringify(userData)); 
    window.location.href = '/store';

  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro do AuthProvider");
  return context;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);