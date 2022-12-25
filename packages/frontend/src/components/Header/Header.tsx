import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const isDarkMode = false;
  return (
    <header className="px-6 py-5 border border-b bg-white">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="text-slate-600 font-semibold">Todo List</div>
        <div>
          <ul className="flex items-center justify-between">
            <li className="cursor-pointer">{isDarkMode ? <BsSun /> : <BsMoon />}</li>
          </ul>
        </div>
      </div>
    </header>
  );
};
