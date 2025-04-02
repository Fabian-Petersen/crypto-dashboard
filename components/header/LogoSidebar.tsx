import React from "react";
import { LineChart } from "lucide-react";

const LogoSidebar = () => {
  return (
    <div className="flex items-center gap-1 py-6">
      <span className="bg-clr_primary_900 rounded-sm flex justify-center items-center text-gray-900 dark:text-white">
        <LineChart size={24} />
      </span>
      <p className="dark:text-white text-gray-900 text-[18px] tracking-wider font-semibold">
        FinDash
      </p>
    </div>
  );
};

export default LogoSidebar;
