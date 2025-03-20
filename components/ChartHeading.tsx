// $ This component check what size of heading is passed in and renders the correct heading size for page sub headings

import * as React from "react";

interface ChartHeadingProps {
  title: string | undefined;
  className?: string;
  subHeading?: string;
}

// modify the code to accept different heading sizes by passing a type prop
const ChartHeading = ({ title, className, subHeading }: ChartHeadingProps) => {
  // $ Use if statements to check for different heading sizes
  return (
    <>
      <h2 className={`${className} text-gray-800 text-[1.5rem] font-bold`}>
        {title}
      </h2>
      <p>{subHeading}</p>
    </>
  );
};

export default ChartHeading;
