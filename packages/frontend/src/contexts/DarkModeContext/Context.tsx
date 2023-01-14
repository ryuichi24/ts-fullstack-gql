import { createContext } from "react";

export type DarkModeContextProp = {
  isDarkMode: boolean;
  toggleIsDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextProp>({
  isDarkMode: false,
  toggleIsDarkMode: () => ({}),
});
