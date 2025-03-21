// $ This component manages the theme of the website, dark theme or light theme.
// $ To use this the useSetTheme hook must be imported and used in the component to manage the theme state.
// $ The icons for the theme toggle are imported from the component ThemeToggleIcon.

"use client";
import { Moon, Sun } from "lucide-react";
import Button from "@/components/Button";
import useScreenSize from "@/app/hooks/useScreenSize";
import useSetDarkTheme from "@/app/hooks/useSetDarkTheme";

const ThemeToggleButton = () => {
  const { toggleDarkTheme, darkMode } = useSetDarkTheme();
  const isMobile = useScreenSize(740);

  const handleClick = () => {
    toggleDarkTheme();
  };

  return (
    <div className="hover:cursor-pointer">
      <Button
        type="button"
        onClick={handleClick}
        className={`rounded-full p-2 cursor-pointer transition-colors ${
          darkMode
            ? "bg-gray-800 text-yellow-300 hover:text-amber-400"
            : "bg-gray-200 text-gray-600 hover:text-gray-700"
        }`}
      >
        {darkMode ? (
          <Sun size={isMobile ? 20 : 24} />
        ) : (
          <Moon size={isMobile ? 20 : 24} />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggleButton;
