// $ This is the main component for the sidebar. The children are the sidebarLinks Component. Also, the logo is noy displayed on screen size less than 968px.

import React from "react";
import SideBarLinks from "./SideBarLinks";
import LogoSidebar from "./LogoSidebar";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={`${className} hidden fixed h-screen sm:flex flex-col gap-2 divide-y divide-gray-200 px-4 border-r-1 border-gray-200`}
    >
      <div className="-mx-4">
        <LogoSidebar />
      </div>
      <div className="-mx-4">
        <SideBarLinks />
      </div>
    </aside>
  );
};

export default Sidebar;
