import React from "react";
import { Loader as LoaderComp } from "@mantine/core";
// import LogoBanner from "../logo-banner/logoBanner";

const Loader = ({ active, msg }) => {
  if (!active) return <></>;
  return (
    <div
      className={
        "fixed z-50 h-full w-full top-0 left-0 flex flex-col items-center justify-center bg-[#00000054]"
      }
    >
      <LoaderComp size={120} color={"#2c4cc9"} />
      <h1 className="font-bold text-2xl text-main">{msg}</h1>
    </div>
  );
};

export default Loader;
