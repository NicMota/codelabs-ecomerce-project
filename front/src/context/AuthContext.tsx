import {createContext, useContext,useState, type ReactNode} from 'react';
type User = {
    name:string;
    role:"admin" | "user";
    token:string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(userData: User) {
    setUser(userData);
    localStorage.setItem("auth", JSON.stringify(userData)); // opcional
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