import React from "react";
import LogoSidebar from "./LogoSidebar";
import { Menu } from "lucide-react";
import { useNav } from "@/app/contexts/MenuToggleContext";
import ThemeToggleButton from "../ThemeToggleButton";

function MobileHeader() {
  const { setOpenSidebar, openSidebar } = useNav();
  return (
    <div className="fixed top-0 z-[1000] bg-white dark:bg-gray-900 dark:text-white w-full flex justify-between items-center px-4 shadow dark:shadow-gray-800/90">
      <div className="flex gap-6">
        <LogoSidebar />
        <button
          className="hover:cursor-pointer dark:text-white"
          onClick={() => {
            console.log(openSidebar);
            setOpenSidebar(!openSidebar);
          }}
        >
          <Menu />
        </button>
      </div>
      <ThemeToggleButton />
    </div>
  );
}

export default MobileHeader;
