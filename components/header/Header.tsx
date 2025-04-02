import React from "react";
import DesktopHeader from "./DesktopHeader";
import useScreenSize from "@/app/hooks/useScreenSize";
import MobileHeader from "./MobileHeader";

function Header() {
  const isMobile = useScreenSize(768);

  return (
    <div className="border border-red-500">
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </div>
  );
}

export default Header;
