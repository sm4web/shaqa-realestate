import Image from "next/image";
import React from "react";

const HeroSearchItem = ({ title, placeholder }) => (
  <div className="flex-1 felx flex-col justify-between items-start my-auto">
    <select className="max-w-full lg:max-w-[200px] w-full text-[16px] lg:text-[22px] font-semibold">
      <option>{title}</option>
    </select>
    <h1 className="mt-[18px] text-[#6d6d6d] text-[14px] lg:text-[20px] font-medium">
      {placeholder}
    </h1>
  </div>
);

const Hero = () => {
  return (
    <section
      id="service"
      className="w-full flex justify-between items-start container h-screen lg:max-h-[950px]"
    >
      <div className="flex-1 relative mt-16 z-50 lg:mt-[200px]">
        <h1 className="text-[52px] leading-[160%] text-white lg:text-secondary z-50 lg:text-[68px] xl:text-[80px] font-extrabold capitalize ">
          Find your next perfect place to live
        </h1>
        <div className="-bottom-[300px] z-50 lg:-bottom-[240px] absolute min-w-full lg:min-w-[150%] px-4 lg:px-12 bg-white shadow-xl rounded-2xl xl:rounded-full min-h-fit py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px] xl:gap-0 ">
          <HeroSearchItem
            title={"Location"}
            placeholder={"Select Your Location"}
          />
          <HeroSearchItem
            title={"Property Type"}
            placeholder={"Select Property Type"}
          />
          <HeroSearchItem
            title={"Max Price"}
            placeholder={"Select Your Price"}
          />
        </div>
      </div>
      <div className="absolute z-0 w-full h-screen top-[64px] left-0 lg:hidden">
        <Image
          src={require("../../assets/images/landingHero.png")}
          className={"w-full h-full object-cover"}
        />
      </div>
      <div className="flex-1 h-full hidden lg:block">
        <Image
          src={require("../../assets/images/landingHero.png")}
          className={"h-full object-cover"}
        />
      </div>
    </section>
  );
};

export default Hero;
