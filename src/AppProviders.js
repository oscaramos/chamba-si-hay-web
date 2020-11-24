import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import { SidebarProvider } from "./hooks/useSidebar";
import { UserProvider } from "./hooks/useUser";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default AppProviders;
