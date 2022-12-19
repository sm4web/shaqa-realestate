import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section
      id={"about"}
      className="min-h-[640px] w-full py-6 flex flex-col lg:flex-row items-start gap-[50px] lg:gap-[100px]"
    >
      <div className="hidden lg:block relative max-w-[600px] w-full">
        <Image
          src={require("../../assets/images/landingHalfWave.png")}
          className={
            "absolute z-30 left-0 top-0 lg:-top-[160px] h-[420px] w-[600px]"
          }
        />
        <Image
          src={require("../../assets/images/landingVioletSqaure.png")}
          className={
            "absolute z-10 left-0 top-0 w-screen h-[500px] lg:w-[500px]"
          }
        />
        <Image
          src={require("../../assets/images/landingBuildingImage.png")}
          className={
            "absolute z-20 left-0 lg:left-[120px] top-[80px] w-[90%] h-[500px] lg:w-[500px]"
          }
        />
      </div>

      <div className="px-4 flex z-50 flex-col gap-[32px] lg:self-center">
        <h1 className="text-main text-2xl font-bold">About Us</h1>
        <h1 className="text-secondary text-4xl font-bold capitalize">
          We Are providing you the top <br />
          <span className="text-main">Real State</span> property
        </h1>
        <h1 className="mt-[32px] text-[#5a5a5a] text-[20px] font-normal max-w-[600px]">
          Shaqa is a Real Estate platform connecting the buyer and the seller in
          the real state industry, where you can find various types of
          properties ex: villa, apartment, rented student house. Help us grow by
          following us o linkedin
        </h1>
        <div className="mt-[24px]">
          <button className="mainBTN w-full rounded-full">Contact Us</button>
        </div>
      </div>
      <Image
        src={require("../../assets/images/landingAboutGroup.png")}
        className={"lg:hidden pr-4"}
      />
    </section>
  );
};

export default About;
