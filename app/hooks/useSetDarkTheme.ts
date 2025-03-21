import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const useSetDarkTheme = () => {
  // $ Initialize state with a check for system preference or saved preference
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // $ Initial setup - run once on mount
  useEffect(() => {
    // $ Check if there's a saved preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light" || !savedTheme) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // $ If no saved preference, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // $ Effect to update DOM and localStorage when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return { toggleDarkTheme, darkMode };
};

export default useSetDarkTheme;
