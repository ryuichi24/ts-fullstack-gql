import React from "react";
import { Header } from "../Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-100 dark:bg-zinc-800 mx-auto">
      <Header />
      <div>{children}</div>
    </div>
  );
};
