"use client";

// $ This component renders all the components for the dashboard mobile and desktop
import React from "react";
import useScreenSize from "@/app/hooks/useScreenSize";
import Grid from "./Grid";
import Sidebar from "../dashboardSidebar/Sidebar";
import MobileHeader from "../header/MobileHeader";
import MobileSidebarMenu from "../dashboardSidebar/MobileSidebarMenu";

function DashboardMainComponent() {
  const isMobile = useScreenSize(768);
  return isMobile ? (
    <div className="h-auto w-full">
      <MobileHeader />
      <Grid className="mt-[6rem]" />
      <MobileSidebarMenu />
    </div>
  ) : (
    // $ Set the layout for the dashboard page, 1 column for the sidebar, spanning all rows with a max width of 15rem. The navbar span full width in the first row. The grid start on row 2 and span the rest of the space.
    <div className="grid grid-cols-[minmax(15rem,18rem)_1fr] min-h-screen">
      <Sidebar className="h-screen sticky top-0" />
      <Grid className="" />
    </div>
  );
}

export default DashboardMainComponent;
