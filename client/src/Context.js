import { createContext, useState } from "react";

// Context for user data and auth check
const AuthContext = createContext();
const ContextProvider = ({ children }) => {
  // user === null -> not authenticated
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ContextProvider, AuthContext };
