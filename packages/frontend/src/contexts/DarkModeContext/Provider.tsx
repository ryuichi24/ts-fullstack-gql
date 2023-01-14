import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./Context";

type DarkModeProviderProps = {
  children: React.ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleIsDarkMode = () => {
    const isDarkModePreffered = localStorage.getItem("THEME") === "DARK";

    if (isDarkModePreffered) {
      setIsDarkMode(false);
      localStorage.setItem("THEME", "LIGHT");
    } else {
      setIsDarkMode(true);
      localStorage.setItem("THEME", "DARK");
    }
  };

  useEffect(() => {
    const isDarkModePreffered = localStorage.getItem("THEME") === "DARK";
    const isDarkModePrefferedInSystem = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isThemeSet = "THEME" in localStorage;

    if (!isThemeSet && !isDarkModePrefferedInSystem) {
      setIsDarkMode(false);
      return;
    }

    if (!isThemeSet && isDarkModePrefferedInSystem) {
      setIsDarkMode(true);
      return;
    }

    if (isThemeSet && !isDarkModePreffered) {
      setIsDarkMode(false);
      return;
    }

    if (isThemeSet && isDarkModePreffered) {
      setIsDarkMode(true);
      return;
    }
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const handlePrefferedColorSchemeChange = (event: MediaQueryListEvent) => {
      const isThemeSet = "THEME" in localStorage;
      if (isThemeSet) return;
      setIsDarkMode(event.matches);
    };

    mediaQueryList.addEventListener("change", handlePrefferedColorSchemeChange);

    return () =>
      mediaQueryList.removeEventListener(
        "change",
        handlePrefferedColorSchemeChange
      );
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleIsDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
