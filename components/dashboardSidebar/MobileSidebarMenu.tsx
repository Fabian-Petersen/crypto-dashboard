// $ This component renders the sidebar links on the menu when it is opened

import React from "react";
import { motion } from "framer-motion";
import { useNav } from "@/app/contexts/MenuToggleContext";
import SideBarLinks from "./SideBarLinks";

function MobileSidebarMenu() {
  const { openSidebar } = useNav();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: openSidebar ? "0%" : "-100%" }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed left-0 top-[3.5rem] h-full w-[55%] sm:w-[45%] bg-white dark:bg-gray-900 shadow-lg flex flex-col gap-6 py-6 px-1 sm:px-4 z-[1000] lg:hidden"
    >
      <SideBarLinks />
    </motion.div>
  );
}

export default MobileSidebarMenu;
