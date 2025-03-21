import React from "react";
import { LineChart } from "lucide-react";

const LogoSidebar = () => {
  return (
    <div className="flex items-center justify-start gap-1 sm:px-4 py-4">
      <span className="bg-clr_primary_900 rounded-sm px-2 py-2 flex justify-center items-center text-gray-900 dark:text-white">
        <LineChart size={24} />
      </span>
      <p className="dark:text-white text-gray-900 text-[18px] tracking-wider font-semibold hidden lg:block">
        FinDash
      </p>
    </div>
  );
};

export default LogoSidebar;
