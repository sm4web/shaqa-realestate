import React from "react";

const SortingSection = () => {
  return (
    <div className="container mt-6 md:mt-[60px] w-full flex items-center justify-between">
      <h1 className="text-xl md:text-3xl font-bold">34 Result</h1>
      <div>
        <select
          id="sort-by"
          defaultValue={"0"}
          className="appearance-none p-2.5 bg-lightmain border text-gray-900 text-sm h-[50px] min-w-[140px] md:min-w-[220px] flex items-center justify-center rounded-lg focus:ring-main focus:border-main border-none shadow-xl"
        >
          <option value={"0"}>Most Viewed</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
    </div>
  );
};

export default SortingSection;
