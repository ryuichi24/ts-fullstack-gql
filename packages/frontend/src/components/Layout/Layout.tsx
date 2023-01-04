import React, { ReactNode } from "react";
import { Header } from "../Header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="h-screen bg-gray-100">{children}</div>;
    </>
  );
};
