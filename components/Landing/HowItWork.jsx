import Image from "next/image";
import React from "react";
import HIW1 from "../../assets/images/HIW1.svg";
import HIW2 from "../../assets/images/HIW2.svg";
import HIW3 from "../../assets/images/HIW3.svg";
import HIW4 from "../../assets/images/HIW4.svg";

const HowItWork = () => {
  return (
    <section id="contact" className="container mt-[100px] lg:mt-[200px]">
      <h1 className="text-center text-[48px] text-main mb-12 lg:text-[60px] font-bold">
        How It Work
      </h1>
      <div className="mt-[100px] grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[64px]">
        <HowItWorkCard icon={HIW1} title={"Search your Demanding House"} />{" "}
        <HowItWorkCard icon={HIW2} title={"Our Best Home Features"} />{" "}
        <HowItWorkCard icon={HIW3} title={"Book Your Dream House Property"} />{" "}
        <HowItWorkCard
          icon={HIW4}
          title={"Enjoy Your Place With Your Family "}
        />
      </div>
    </section>
  );
};

const HowItWorkCard = ({ icon, title, desc }) => {
  return (
    <div className="w-full flex flex-col items-start gap-[24px]">
      <Image
        src={icon}
        width={56}
        height={56}
        className={"drop-shadow-xl"}
        alt={title}
      />
      <h1 className="max-w-[200px] text-[22px] mt-[16px] font-bold">{title}</h1>
      <h1 className="mt-[24px] tex-[18px] font-light text-[#5a5a5a]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget dolor nam
        risus sem hac consequat. Nec vitae consectetur velit eu, etiam.{" "}
      </h1>
    </div>
  );
};

export default HowItWork;
