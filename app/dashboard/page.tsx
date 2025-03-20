// $ This component renders al the components for the dashboard in the page route component

import React from "react";
import DashboardMainComponent from "@/components/dashboard/DashboardMainComponent";

const DashboardLayout = () => {
  return (
    <main className="pb-4">
      <DashboardMainComponent />
    </main>
  );
};

export default DashboardLayout;
