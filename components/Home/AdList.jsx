import React from "react";
import AdItem from "./AdItem";

const AdList = ({ data = 9 }) => {
  return (
    <div className="mt-6 md:mt-[60px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
      {Array.from({ length: data }).map((item) => (
        <AdItem key={item} />
      ))}
    </div>
  );
};

export default AdList;
