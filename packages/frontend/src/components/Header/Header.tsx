import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDarkModeContext } from "../../contexts/DarkModeContext";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const { isDarkMode, toggleIsDarkMode } = useDarkModeContext();
  return (
    <header className="px-6 py-5 border-b bg-white dark:bg-zinc-800 dark:border-zinc-700">
      <div className="flex justify-between">
        <section>
          <span className="text-slate-600 font-semibold dark:text-zinc-100">Todo List</span>
        </section>
        <section>
          <ul>
            <li>
              <button onClick={toggleIsDarkMode}>
                {isDarkMode ? <BsSun className="text-zinc-100" /> : <BsMoon />}
              </button>
            </li>
          </ul>
        </section>
      </div>
    </header>
  );
};
