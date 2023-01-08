import Image from "next/image";
import React from "react";
import AdImage from "../../assets/images/demo-ad.png";

import { useRouter } from "next/router";
import Aminities from "../General/Aminities";
import LikeAndShare from "../General/LikeAndShare";

import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import convertPriceToCurrency from "../../utils/convertPriceToCurrency";

const AdCard = ({
  title,
  address,
  price,
  id,
  uid,
  rooms,
  space,
  bathrooms = 1,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/advertisement/${id}`,
          query: { uid },
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
      <CardPrice price={price} />
      <CardTitle title={title} />
      <CardAddress address={address} />
      <Aminities
        data={[
          { title: "Bedroom", value: rooms, Icon: KingBedIcon },
          { title: "Bathroom", value: bathrooms, Icon: BathtubIcon },
          { title: "m²", value: space, Icon: StraightenIcon },
        ]}
      />
    </div>
  );
};

const CardAddress = ({ address }) => (
  <h1 className="mt-2 text-gray-500 font-medium text-[14px] md:text-[16px]">
    {address}
  </h1>
);

const CardTitle = ({ title }) => (
  <h1 className="mt-4 text-secondary font-bold text-[16px] md:text-[20px]">
    {title}
  </h1>
);

const CardPrice = ({ price }) => (
  <div className="flex items-center justify-between mt-[24px]">
    <h1 className="mainColor font-bold text-[18px] lg:text-[18px] xl:text-[24px]">
      {convertPriceToCurrency(price)}
    </h1>
    <LikeAndShare />
  </div>
);

export default AdCard;
