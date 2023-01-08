import React from "react";
import AdItem from "./AdItem";

const AdList = ({ data }) => {
  return (
    <div className="mt-6 md:mt-[60px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
      {data?.map((item) => (
        <AdItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default AdList;
