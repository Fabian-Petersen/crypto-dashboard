// $ This component check what size of heading is passed in and renders the correct heading size for page sub headings

import * as React from "react";

type ChartHeadingProps = {
  title: string | undefined;
  className?: string;
  subHeading?: React.ReactNode;
};

const ChartHeading = ({ title, className, subHeading }: ChartHeadingProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className={`${className} tracking-wide dark:text-white text-gray-800 text-[1.5rem] font-bold`}
      >
        {title}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{subHeading}</p>
    </div>
  );
};

export default ChartHeading;
