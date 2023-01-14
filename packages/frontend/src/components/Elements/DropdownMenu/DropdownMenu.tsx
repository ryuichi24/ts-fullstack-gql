import React, { ReactNode, useState } from "react";

type DropdownMenuProps = {
  clickTarget: ReactNode;
  menuItems: ReactNode[];
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  clickTarget,
  menuItems,
}) => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive)

  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        {clickTarget}
      </button>
      {isMenuActive ? (
        <>
          <button
            tabIndex={-1}
            onClick={toggleMenu}
            className="h-full w-full fixed inset-0 z-10 cursor-default"
          ></button>
          <div className="absolute right-0 z-20 bg-white shadow border border-gray-100 py-2 mt-2 rounded-lg w-48 dark:bg-zinc-600 dark:border-zinc-600">
            <ul>
              {menuItems.map((menuItem, index) => (
                <li
                  onClick={toggleMenu}
                  key={index}
                  className="text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg px-4 py-2 dark:hover:bg-zinc-500"
                >
                  {menuItem}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};
