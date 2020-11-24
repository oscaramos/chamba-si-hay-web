import React, { useState, useEffect, createContext, useContext } from "react";
import { getUserType } from "../helpers/UserTypeHelper";
import AuthService from "../services/AuthService";

const AuthContext = createContext(undefined);

export function AuthProvider(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: getUserType(),
    isAuthenticated: AuthService.isAuthenticated(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      const response = await AuthService.getUserInfoById();

      if (response.status === 200) {
        const responseUser = response.data.user;
        setUser({
          ...user,
          name: responseUser.firstName + " " + responseUser.lastName,
          email: responseUser.email,
          role: getUserType(),
        });

        setLoading(false);
      } else {
        setError("Error 404, no encontrado");
      }
    };

    if (user.isAuthenticated) {
      getUserInfo();
    } else {
      // user is not authenticated, do not request to server
      setLoading(false);
    }
  }, []);

  if (loading) {
    return "cargando";
  }

  if (error) {
    return `error sucedido: ${error}`;
  }

  const login = () => {};

  const logout = () => {};

  const register = () => {};

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      {...props}
    />
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be within a AuthProvider");
  }
  return context;
}
