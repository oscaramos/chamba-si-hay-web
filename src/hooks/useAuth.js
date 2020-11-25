import React, { useState, useEffect, createContext, useContext } from "react";
import { getUserType } from "../helpers/UserTypeHelper";
import AuthService from "../services/AuthService";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const FullPageSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: #53c9bd;
`;

function FullPageSpinner() {
  return (
    <FullPageSpinnerContainer>
      <Spinner animation="border" />
    </FullPageSpinnerContainer>
  );
}

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
        setUser((user) => ({
          ...user,
          name: responseUser.firstName + " " + responseUser.lastName,
          email: responseUser.email,
          role: getUserType(),
        }));

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
    return <FullPageSpinner />;
  }

  if (error) {
    return `error sucedido: ${error}`;
  }

  const login = async (username, password) => {
    const result = await AuthService.login(username, password);
    const { status, data } = result;
    if (status === 200) {
      AuthService.storageToken(data.token);
    } else {
      throw new Error("datos incorrectos");
    }
  };

  const logout = () => {
    return AuthService.logout();
  };

  const register = async (user) => {
    const result = await AuthService.register(user);
    const { status } = result;
    if (status !== 200) {
      throw new Error("Error en registro");
    }
  };

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
