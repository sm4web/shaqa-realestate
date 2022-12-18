import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import BannerImage from "../../assets/images/ad_banner.png";
import SimpleSnackbar from "../../components/General/Snackbar";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import GoogleMaps from "../../components/General/GoogleMaps";
import { Form, Formik } from "formik";
import AdList from "../../components/Home/AdList";
import Aminities from "../../components/General/Aminities";
import LikeAndShare from "../../components/General/LikeAndShare";

const Ad = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col">
      <Head>
        <title>Shaqa - {router.query.id}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Advertisement Page - Shaqa, Real Estate"
          key="Advertisement-Page"
        />
      </Head>
      <Header /> {/* Here you pass the Ad title/name */}
      <UserDetails /> {/* Should pass the (image + userDetails) */}
      <PropertyDetails />{" "}
      {/* Should Pass property location, address, title and price */}
      <SimilarOffers />
    </div>
  );
};

// Property Title + Demo Image
const Header = () => (
  <div className="w-full h-[320px] relative">
    <Image
      className="absolute top-0 z-1 left-0 w-full h-full object-cover"
      src={BannerImage}
      alt={"Property Realestate"}
    />
    <div className="container z-9 relative h-full w-full flex flex-col items-start justify-center">
      <h1 className="text-white font-light text-md lg:text-[20px]">
        Home / New Vintage Apartement ...
      </h1>
      <h1 className="text-white font-bold text-xl lg:text-2xl mt-[12px] lg:mt-[32px]">
        New vintage apartment on the Green Avenue
      </h1>
    </div>
  </div>
);

// UserDetails - Section
const UserDetails = () => {
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
    <div className="flex-1">
      <Image
        className="rounded-3xl border-lightmain border-2 h-full object-contain shadow-xl"
        src={require("../../assets/images/demo-ad.png")}
        alt={"A Property"}
      />
    </div>
  );

  const UserProfilePicture = ({ image }) => (
    <Image
      src={
        "data:image/png;base64,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"
      }
      width={120}
      height={120}
      alt={"Avatar"}
      className={"w-[110px] shadow-xl h-[110px] object-contain rounded-full"}
    />
  );

  const UserSlogan = ({ userName, slogan }) => (
    <div>
      <h1 className="text-[20px] lg:text-[28px] text-secondary font-semibold">
        Saif Mohamed
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
          +201206944093 <CopyAllIcon />
        </h1>
      </div>
      <Link
        href={"https://wa.me/+201554304409"}
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
          <UserProfilePicture />
          <UserSlogan />
          <UserContact />
        </div>
      </div>
      {copied && <SimpleSnackbar text={"Copied to clipboard"} />}
    </>
  );
};

// Property details + Location - Section
const PropertyDetails = () => {
  const AdTitle = () => (
    <div className="flex items-start xl:items-center flex-col xl:flex-row justify-between gap-[12px] xl:gap-[24px]">
      <h1 className="text-secondary font-bold text-lg lg:text-xl xl:text-2xl">
        New vintage apartment on the Green Avenue
      </h1>
      <h1 className="text-main font-bold text-[24px] lg:text-[30px] xl:text-[36px]">
        250,000.00
      </h1>
    </div>
  );

  const AdAddress = () => (
    <div className="flex items-center justify-between gap-[24px] mt-[24px] xl:mt-[32px]">
      <h1 className="text-main flex items-center gap-[10px] font-light text-lg lg:text-xl xl:text-2xl">
        <Image
          src={require("../../assets/icons/address-icon.png")}
          width={16}
          height={16}
          alt={"Address Icon"}
        />{" "}
        329 Ambarukmo St, Brooklyn, NY
      </h1>
      <LikeAndShare />
    </div>
  );

  const AdLocation = () => (
    <div className="flex-1 h-full w-full max-w-full lg:max-w-[600px] ">
      <Formik
        initialValues={{
          location: "",
        }}
      >
        {() => (
          <Form>
            <GoogleMaps
              lng={31.2357}
              lat={30.0444}
              form_name={"location"}
              withSearchBar={false}
            />
          </Form>
        )}
      </Formik>
    </div>
  );

  const AdDescription = () => (
    <div className="w-full flex flex-col gap-[12px] mt-4 xl:mt-12 min-h-[240px]">
      <h1 className="font-semibold text-2xl">Property Description</h1>
      <div className="flex items-stretch gap-[12px] w-full h-full">
        <div className="w-2 bg-main"></div>
        <h1 className="text-[#5a5a5a] text-xl font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget dolor
          nam risus sem hac consequat. Nec vitae consectetur velit eu, etiam.
          Nulla senectus dictumst mauris nunc. Senectus nulla lectus nam quis
          nisl non morbi non. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Eget dolor nam risus sem hac consequat. Nec vitae consectetur
          velit eu, etiam. Nulla senectus dictumst mauris nunc. Senectus nulla
          lectus
        </h1>
      </div>
    </div>
  );

  return (
    <div className="w-full container flex flex-col lg:flex-row items-start gap-[12px] lg:gap-[40px] mt-4">
      <div className="flex-1 w-full flex flex-col">
        <AdTitle />
        <AdAddress />
        <Aminities />
        <AdDescription />
      </div>
      <AdLocation />
    </div>
  );
};

const SimilarOffers = () => (
  <div className="container mt-12 flex flex-col items-start">
    <h1 className="text-3xl font-bold text-secondary">Similar Offers</h1>
    <AdList />
  </div>
);

export default Ad;
