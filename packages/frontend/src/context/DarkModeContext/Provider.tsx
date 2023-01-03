import React, { ReactNode, useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./Context";

const THEME = "theme";
const DARK = "dark";
const LIGHT = "light";
const PREFERS_COLOR_SCHME_DARK = "(prefers-color-scheme: dark)";

type DarkModeProviderProps = {
  children: ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleIsDarkMode = () => {
    const isThemeSet = THEME in localStorage;
    const isDarkModePreffered = localStorage.getItem(THEME) === DARK;
    const isDarkModePrefferedInSystem = window.matchMedia(
      PREFERS_COLOR_SCHME_DARK
    ).matches;

    if (!isThemeSet && !isDarkModePrefferedInSystem) {
      localStorage.setItem(THEME, DARK);
      setIsDarkMode(true);
      return;
    }

    if (!isThemeSet && isDarkModePrefferedInSystem) {
      localStorage.setItem(THEME, LIGHT);
      setIsDarkMode(false);
      return;
    }

    if (isDarkModePreffered) {
      localStorage.setItem(THEME, LIGHT);
      setIsDarkMode(false);
    } else {
      localStorage.setItem(THEME, DARK);
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const isThemeSet = THEME in localStorage;

    const isDarkModePrefferedInSystem = window.matchMedia(
      PREFERS_COLOR_SCHME_DARK
    ).matches;

    const isDarkModePreffered = localStorage.getItem(THEME) === DARK;

    if (!isThemeSet && isDarkModePrefferedInSystem) {
      setIsDarkMode(true);
      return;
    }

    if (!isThemeSet && !isDarkModePrefferedInSystem) {
      setIsDarkMode(false);
      return;
    }

    if (isThemeSet && isDarkModePreffered) {
      setIsDarkMode(true);
      return;
    }

    if (isThemeSet && !isDarkModePreffered) {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(PREFERS_COLOR_SCHME_DARK);

    const handlePreferredColorSchemaChange = (event: MediaQueryListEvent) => {
      const isThemeSet = THEME in localStorage;
      if (isThemeSet) return;
      setIsDarkMode(event.matches);
    };

    mediaQueryList.addEventListener("change", handlePreferredColorSchemaChange);

    return () =>
      mediaQueryList.removeEventListener(
        "change",
        handlePreferredColorSchemaChange
      );
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
