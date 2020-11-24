import React from "react";
import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";

const UserContext = createContext(undefined);

export function UserProvider(props) {
  return <UserContext.Provider value={useAuth().user} {...props} />;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContext must be within a UserProvider");
  }
  return context;
}
