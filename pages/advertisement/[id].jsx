import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import BannerImage from "../../assets/images/ad_banner.png";
import SimpleSnackbar from "../../components/General/Snackbar";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import GoogleMaps from "../../components/General/GoogleMaps";
import { Form, Formik } from "formik";
import AdList from "../../components/Home/AdList";
import Aminities from "../../components/General/Aminities";
import LikeAndShare from "../../components/General/LikeAndShare";
import { getAdData } from "../api/fetch-ad";
import convertPriceToCurrency from "../../utils/convertPriceToCurrency";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import { getAdsData } from "../api/fetch-ads";
import { getUserData } from "../api/fetch-user";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Ad = (props) => {
  const { data: AdData, similarOffers, author } = props; // All the advertisement Data
  console.log(AdData);
  return (
    <div className="w-full flex flex-col">
      <Head>
        <title>Shaqa - {AdData.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Advertisement Page - Shaqa, Real Estate"
          key="Advertisement-Page"
        />
      </Head>
      <Header title={AdData.title} images={AdData.images} />{" "}
      {/* Here you pass the Ad title/name */}
      <UserDetails {...author} images={AdData.images} />{" "}
      {/* Should pass the (image + userDetails) */}
      <PropertyDetails {...AdData} />
      {/* Should Pass property location, address, title and price */}
      <SimilarOffers data={similarOffers} />
    </div>
  );
};

// Property Title + Demo Image
const Header = ({ title, images }) => (
  <div className="w-full h-[320px] relative">
    <Image
      className="absolute top-0 z-1 left-0 w-full h-full object-cover"
      src={BannerImage}
      alt={"Advertisement Header"}
    />
    <div className="container z-9 relative h-full w-full flex flex-col items-start justify-center">
      <h1 className="text-white font-light text-md lg:text-[20px]">
        <Link href={"/"} className={"text-blue-400"}>
          Home
        </Link>{" "}
        / {title?.slice(0, title.length - 2)} ...
      </h1>
      <h1 className="text-white font-bold text-xl lg:text-2xl mt-[12px] lg:mt-[32px]">
        {title}.
      </h1>
    </div>
  </div>
);

// UserDetails - Section
const UserDetails = ({ displayName, phoneNumber, profile_photo, images }) => {
  const [copied, setCopied] = useState(false);
  const ref = useRef();

  function handleCopy() {
    setCopied(true);
    var copyElement = ref?.current;
    const copyText = copyElement.innerText;
    navigator.clipboard.writeText(copyText);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  }

  const LeftImage = () => (
    <Swiper
      className="flex-1 w-full"
      style={{
        // @ts-ignore
        "--swiper-pagination-color": "#fff",
        "--swiper-navigation-color": "#000",
      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
    >
      {images?.map((img, idx) => (
        <SwiperSlide
          key={idx}
          className="flex-1 min-w-[100%] max-h-[600px]"
          slot="container-start"
          data-swiper-parallax="-23%"
        >
          <img
            className="w-full max-h-[600px] object-contain shadow-xl"
            src={img}
            alt={"A Property"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  const UserProfilePicture = ({ image }) => (
    <Image
      src={image}
      width={120}
      height={120}
      alt={"Avatar"}
      className={"w-[110px] shadow-xl h-[110px] object-contain rounded-full"}
    />
  );

  const UserSlogan = ({ displayName }) => (
    <div>
      <h1 className="text-[20px] lg:text-[28px] text-secondary font-semibold">
        {displayName}
      </h1>
      <h1 className="text-[16px] lg:text-[20px] text-[#818181] font-light">
        Property Owner
      </h1>
    </div>
  );

  const UserContact = ({ phoneNumber, whatsAppNumber }) => (
    <div className="w-full flex flex-col gap-[20px] py-4">
      <div
        onClick={handleCopy}
        className="flex items-center gap-[24px] px-8 rounded-2xl shadow-xl mainBTN animate duration-200 cursor-pointer bg-white text-main w-full"
      >
        <Image
          src={require("../../assets/icons/phone-icon.png")}
          width={20}
          height={20}
          alt={"Mobile Phone"}
        />
        <h1
          ref={ref}
          className="text-[#818181] w-full flex items-center justify-between font-semibold"
        >
          {phoneNumber} <CopyAllIcon />
        </h1>
      </div>
      <Link
        href={`https://wa.me/${
          phoneNumber.startsWith("+") ? phoneNumber : "+2" + phoneNumber
        }`}
        target={"_blank"}
        className="flex items-center gap-[24px] px-8 rounded-2xl shadow-xl mainBTN animate duration-200 cursor-pointer bg-white text-main w-full"
      >
        <Image
          src={require("../../assets/icons/chat-icon.png")}
          width={20}
          height={20}
          alt={"Chat icon"}
        />
        <h1 className="text-[#818181] font-semibold">Chat with the seller.</h1>
      </Link>
    </div>
  );
  return (
    <>
      <div className="container w-full flex-col xl:flex-row flex items-stretch min-h-[570px] gap-[32px] mt-4 mb-4">
        <LeftImage />
        <div className="flex-1 h-full xl:min-h-[450px] lg:max-w-[600px] flex flex-col justify-between gap-[12px] items-start p-4">
          <UserProfilePicture image={profile_photo} />
          <UserSlogan displayName={displayName} />
          <UserContact phoneNumber={phoneNumber} />
        </div>
      </div>
      {copied && <SimpleSnackbar text={"Copied to clipboard"} />}
    </>
  );
};

// Property details + Location - Section
const PropertyDetails = ({
  title,
  price,
  address,
  description,
  location,
  rooms,
  space,
}) => {
  const AdTitle = ({ title, price }) => (
    <div className="flex items-start xl:items-center flex-col xl:flex-row justify-between gap-[12px] xl:gap-[24px]">
      <h1 className="text-secondary font-bold text-lg lg:text-xl xl:text-2xl">
        {title}.
      </h1>
      <h1 className="text-main font-bold text-[24px] lg:text-[30px] xl:text-[36px]">
        {convertPriceToCurrency(price)}
      </h1>
    </div>
  );

  const AdAddress = ({ address }) => (
    <div className="flex items-center justify-between gap-[24px] mt-[24px] xl:mt-[32px]">
      <h1 className="text-main flex items-center gap-[10px] font-light text-lg lg:text-xl xl:text-2xl">
        <Image
          src={require("../../assets/icons/address-icon.png")}
          width={16}
          height={16}
          alt={"Address Icon"}
        />{" "}
        {address}
      </h1>
      <LikeAndShare />
    </div>
  );

  const AdLocation = ({ location }) => (
    <div className="flex-1 h-full w-full max-w-full lg:max-w-[600px] ">
      <Formik
        initialValues={{
          location: "",
        }}
      >
        {() => (
          <Form>
            <GoogleMaps
              lng={location.lng}
              lat={location.lat}
              form_name={"location"}
              withSearchBar={false}
            />
          </Form>
        )}
      </Formik>
    </div>
  );

  const AdDescription = ({ description }) => (
    <div className="w-full flex flex-col gap-[12px] mt-4 xl:mt-12 min-h-[240px]">
      <h1 className="font-semibold text-2xl">Property Description</h1>
      <div className="flex items-stretch gap-[12px] w-full h-full">
        <div className="w-2 bg-main"></div>
        <h1 className="text-[#5a5a5a] text-xl font-light">{description}</h1>
      </div>
    </div>
  );

  return (
    <div className="w-full container flex flex-col lg:flex-row items-start gap-[12px] lg:gap-[40px] mt-4">
      <div className="flex-1 w-full flex flex-col">
        <AdTitle title={title} price={price} />
        <AdAddress address={address} />
        <Aminities
          data={[
            { title: "Bedroom", value: rooms, Icon: KingBedIcon },
            { title: "Bathroom", value: 1, Icon: BathtubIcon },
            { title: "m²", value: space, Icon: StraightenIcon },
          ]}
        />
        <AdDescription description={description} />
      </div>
      <AdLocation location={location} />
    </div>
  );
};

const SimilarOffers = ({ data }) => (
  <div className="container mt-12 flex flex-col items-start">
    <h1 className="text-3xl font-bold text-secondary">Similar Offers</h1>
    <AdList data={data} />
  </div>
);

export async function getServerSideProps(context) {
  const AdData = await getAdData(context.params.id);
  const AdsData = await getAdsData();
  const UserData = await getUserData(context.query.uid);

  return {
    props: { data: AdData, similarOffers: AdsData, author: UserData }, // will be passed to the page component as props
  };
}

export default Ad;
