import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  login: async () => {},
  logout: async () => {},
});

export { AuthContext };
