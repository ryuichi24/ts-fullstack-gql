import { createContext } from "react";

export type DarkModeContextProp = {
  isDarkMode: boolean;
  toggleIsDarkMode: () => void;
};

/**
 * @see https://github.com/vitejs/vite/issues/3301
 * @description it should be in a separate file to make vite hot reload
 */
export const DarkModeContext = createContext<DarkModeContextProp>({
  isDarkMode: false,
  toggleIsDarkMode: () => ({}),
});
