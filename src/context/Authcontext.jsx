import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {role, name, id, email, token}

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    const name  = localStorage.getItem("name");
    const id    = localStorage.getItem("id");
    const email = localStorage.getItem("email");
    if (token && role) setUser({ token, role, name, id, email });
  }, []);

  const login = (data) => {
    // data matches your API: {role, name, id, email, token}
    localStorage.setItem("token", data.token);
    localStorage.setItem("role",  data.role);
    localStorage.setItem("name",  data.name);
    localStorage.setItem("id",    String(data.id));
    localStorage.setItem("email", data.email);
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
