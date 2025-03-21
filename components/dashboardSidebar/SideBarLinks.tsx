// $ This components renders the links for the sidebar, the data is from the pageLinkData file.

import React from "react";
import pageLinkData from "@/public/data/pageLinkData";

function SideBarLinks() {
  return (
    <>
      <ul className="capitalize text-clr_blueGray_700 flex flex-col gap-2 h-full w-full mx-auto px-2">
        {pageLinkData.map((link) => (
          <li
            key={link.id}
            className="tracking-wider flex items-center gap-2 justify-start hover:cursor-pointer lg:hover:bg-clr_primary_900 bg-transparent py-4 mx-auto lg:mx-0 px-4 hover:bg-gray-400 hover:rounded-lg text-gray-800 dark:text-white dark:hover:text-gray-700"
          >
            <span className="lg:hover:text-white">
              {React.createElement(link.icon)}
            </span>

            <a href={link.url} className="hidden lg:block">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SideBarLinks;
