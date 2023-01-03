import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useDarkModeContext } from "../../context/DarkModeContext";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const { isDarkMode, toggleIsDarkMode } = useDarkModeContext();

  return (
    <header className="px-6 py-5 border border-b bg-white dark:bg-zinc-800 dark:border-zinc-700">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="text-slate-600 font-semibold dark:text-zinc-100">
          Todo List
        </div>
        <div>
          <ul className="flex items-center justify-between">
            <li className="cursor-pointer">
              <button onClick={toggleIsDarkMode}>
                {isDarkMode ? <BsSun className="text-zinc-100" /> : <BsMoon />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
