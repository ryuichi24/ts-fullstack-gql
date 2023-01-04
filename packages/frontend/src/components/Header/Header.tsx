import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = ({}) => {
  const isDarkMode = false
  return (
    <header className="px-6 py-5 border-b bg-white">
      <div className="flex justify-between">
        <section>
          <span className="text-slate-600 font-semibold">Todo List</span>
        </section>
        <section>
          <ul>
            <li>
              <button>
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
            </li>
          </ul>
        </section>
      </div>
    </header>
  );
};
