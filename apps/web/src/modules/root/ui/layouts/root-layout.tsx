import React from "react";
import { RootNavbar } from "../components/root-navbar";
import { RootSidebar } from "../components/root-sidebar";

interface RootLayoutProps {
  children: React.ReactNode;
}
export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="w-screen h-dvh min-h-dvh relative flex flex-col">
      <RootNavbar />
      <div className="flex flex-row gap-2 px-4 h-full">
        <RootSidebar />
        <div>{children}</div>
      </div>
    </main>
  );
};
