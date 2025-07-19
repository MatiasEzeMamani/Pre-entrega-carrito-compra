import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); 

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); 
        setUser(parsedUser);
        setToken(storedToken);
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      
      const loggedInUser = { 
        username: username, 
        role: username === 'admin' ? 'admin' : 'user' 
      };

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      setToken(fakeToken);
      setUser(loggedInUser); 
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("carrito"); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);