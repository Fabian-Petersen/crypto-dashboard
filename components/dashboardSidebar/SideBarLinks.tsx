// $ This components renders the links for the sidebar, the data is from the pageLinkData file.

import React from "react";
import pageLinkData from "@/public/data/pageLinkData";

function SideBarLinks() {
  return (
    <ul className="capitalize text-clr_blueGray_700 flex flex-col gap-2 h-full w-full px-2 py-6">
      {pageLinkData.map((link) => (
        <li
          key={link.id}
          className="tracking-wider flex gap-2 justify-start items-center hover:cursor-pointer lg:hover:bg-clr_primary_900 bg-transparent py-4 px-4 hover:bg-gray-300 hover:rounded-lg text-gray-800 dark:text-white dark:hover:text-gray-700 text-[clamp(0.8rem,3.5vw,1.2rem)]"
        >
          <span className="lg:hover:text-white text-[clamp(0.8rem,3vw,1.2rem)]">
            {React.createElement(link.icon)}
          </span>
          <a href={link.url} className="lg:block">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SideBarLinks;
