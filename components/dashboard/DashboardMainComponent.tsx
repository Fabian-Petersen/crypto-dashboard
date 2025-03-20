"use client";

// $ This component renders all the components for the dashboard mobile and desktop
import React from "react";

import useScreenSize from "@/app/hooks/useScreenSize";
import Grid from "./Grid";
import Sidebar from "../dashboardSidebar/Sidebar";
import SidebarMobileMenu from "../dashboardSidebar/SidebarMobileMenu";

function DashboardMainComponent() {
  const isMobile = useScreenSize(768);
  return isMobile ? (
    <div className="grid grid-cols-1 grid-rows-[4rem_1fr] h-auto p-2 gap-4 w-full">
      <SidebarMobileMenu />
      <Grid className="row-start-2 w-full" />
    </div>
  ) : (
    // $ Set the layout for the dashboard page, 1 column for the sidebar, spanning all rows with a max width of 15rem. The navbar span full width in the first row. The grid start on row 2 and span the rest of the space.
    <div className="grid lg:grid-cols-[minmax(10rem,15rem)_1fr] min-h-screen">
      <Sidebar className="col-start-1" />
      <Grid className="col-start-2 col-span-4 max-w-7xl xl:px-10" />
    </div>
  );
}

export default DashboardMainComponent;
