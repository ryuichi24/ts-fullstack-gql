/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";

type DropdownMenuProps = {
  clickTarget: React.ReactNode;
  menuItems: React.ReactNode[];
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menuItems,
  clickTarget,
}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <>
      <div className="relative">
        <button
          className="relative"
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          {clickTarget}
        </button>
        {isMenuActive ? (
          <>
            <button
              className="fixed inset-0 h-full w-full cursor-default z-10"
              tabIndex={-1}
              onClick={() => setIsMenuActive(!isMenuActive)}
            ></button>
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow z-20 border border-gray-100">
              <ul className="list-none">
                {menuItems.map((menuItem, index) => (
                  <li
                    key={index}
                    className="cursor-pointer rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMenuActive(!isMenuActive)}
                  >
                    {menuItem}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
