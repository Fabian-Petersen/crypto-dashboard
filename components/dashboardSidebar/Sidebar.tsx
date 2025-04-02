// $ This is the main component for the sidebar on the Desktop View

import React from "react";
import LogoSidebar from "../header/LogoSidebar";
import SideBarLinks from "./SideBarLinks";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={`${className} sm:flex flex-col gap-2 divide-y divide-gray-200 dark:divide-gray-700 border-r-1 border-gray-200 dark:border-gray-700`}
    >
      <div className="flex justify-between items-center px-4">
        <LogoSidebar />
      </div>
      <SideBarLinks />
    </aside>
  );
};

export default Sidebar;
