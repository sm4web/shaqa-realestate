import Image from "next/image";
import React from "react";
import AdImage from "../../assets/images/demo-ad.png";

import { useRouter } from "next/router";
import Aminities from "../General/Aminities";
import LikeAndShare from "../General/LikeAndShare";

const AdCard = ({ title, address, price, aminities }) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push({
          pathname: "/advertisement/1",
        })
      }
      className="cursor-pointer shadow-main/5 hover:shadow-main/30 animate duration-150 ease-in-out w-full p-[12px] md:p-[18px] min-h-fit rounded-xl shadow-xl drop-shadow-lg border border-gray-100"
    >
      <Image
        alt="Realestate Advertisement"
        src={AdImage}
        height={600}
        width={"100%"}
        className={"w-full max-h-[300px] object-cover rounded-lg"}
      />
      <CardPrice />
      <CardTitle />
      <CardAddress />
      <Aminities />
    </div>
  );
};

const CardAddress = ({ address }) => (
  <h1 className="mt-2 text-gray-500 font-medium text-[14px] md:text-[16px]">
    329 Ambarukmo St, Brooklyn, NY
  </h1>
);

const CardTitle = ({ title }) => (
  <h1 className="mt-4 text-secondary font-bold text-[16px] md:text-[20px]">
    New vintage apartment on the Green Avenue
  </h1>
);

const CardPrice = ({ price, currency }) => (
  <div className="flex items-center justify-between mt-[24px]">
    <h1 className="mainColor font-bold text-[18px] lg:text-[18px] xl:text-[24px]">
      250,000 L.E
    </h1>
    <LikeAndShare />
  </div>
);

export default AdCard;
