import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { uuid } from "uuidv4";
import sha2a from "../app/api/sha2a";
import GoogleMaps from "../components/General/GoogleMaps";
import InputHandler from "../components/General/InputHandler";
import Loader from "../components/General/Loader";
import UploadImages from "../components/General/uploadAdImages";
import withAuth from "../hooks/withAuth";
import uploadProfilePic from "../utils/uploadProfilePictureToFirebase";

const AdTypes = [
  { title: "Sell your house", value: "sell" },
  { title: "Rent your house", value: "rent" },
  { title: "Offer a students house", value: "student" },
];

const CreateAd = () => {
  const router = useRouter();
  const { uid } = useSelector((state) => state.auth.data.user);
  const [loading, setLoading] = useState(false);

  const redirectToHome = () =>
    router.push({
      pathname: "/",
    });

  const handleCreateAd = async (data) => {
    setLoading(true);
    const adImagesToUpload = data.images;
    let urls = [];
    for (let i = 0; i < adImagesToUpload.length; i++) {
      const image = adImagesToUpload[i];
      const imageURL = await uploadProfilePic(image, "AdsImages", uuid());
      urls = [...urls, imageURL];
    }
    await sha2a.post("/create-ad", {
      uid,
      data: { ...data, images: urls },
    });
    setLoading(false);
    redirectToHome();
  };

  return (
    <div className="w-full container py-4">
      <Loader active={loading} msg={"Uploading your images, pelase wait..."} />
      <Head>
        <title>Shaqa - Place an advertisement</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Advertisement Page - Shaqa, Real Estate"
          key="Ad-Page"
        />
      </Head>
      <Formik
        initialValues={{
          title: "",
          location: "",
          images: [],
          description: "",
        }}
        onSubmit={(values) => {
          handleCreateAd(values);
        }}
      >
        {(props) => (
          <Form>
            <AdType />
            <div className="mt-6 w-full flex flex-col lg:flex-row items-start h-full gap-[24px]">
              <LeftForm />
              <RightForm />
            </div>
            <div className="flex items-center flex-col lg:flex-row w-full gap-[24px] mt-6">
              <button
                onClick={redirectToHome}
                type="button"
                className="mainBTN border-2 border-main text-main bg-white w-full"
              >
                CANCEL
              </button>
              <button type="submit" className="mainBTN w-full">
                SAVE
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const RightForm = () => (
  <div className="flex flex-1 w-full flex-col gap-[24px]">
    <GoogleMaps form_name={"location"} withSearchBar />
    <UploadImages name="images" />
  </div>
);

const LeftForm = () => (
  <div className="flex flex-1 w-full flex-col gap-[24px]">
    <InputHandler
      name={"title"}
      placeholder={"Enter Ad Title."}
      label={"Title"}
    />
    <InputHandler
      name={"description"}
      placeholder={"Enter Ad Description."}
      label={"Description"}
      kind={"area"}
    />
    <InputHandler
      name={"space"}
      placeholder={"Enter House Area in meters."}
      label={"Area"}
      type={"number"}
    />
    <InputHandler
      name={"price"}
      placeholder={"Enter Your Price."}
      label={"Price"}
      type={"number"}
    />
    <InputHandler
      name={"rooms"}
      placeholder={"Enter Number Of Rooms."}
      label={"Number Of Rooms"}
      type={"number"}
    />
  </div>
);
const AdType = () => {
  const [type, setType] = useState("sell");

  const defaultStyle =
    "animate active:fade w-full bg-white text-main text-bold text-[14px] md:text-[20px] rounded-full shadow-main/20 hover:shadow-main/30 cursor-pointer shadow-lg flex items-center justify-center p-4 lg:p-6";

  const activeStyle = defaultStyle
    .replace("bg-white", "bg-main")
    .replace("text-main", "text-white");

  return (
    <div className="flex flex-col items-start gap-[24px]">
      <h1 className="text-[16px] md:text-[20px] font-medium">Choose Ad Type</h1>
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[12px]">
        {AdTypes.map((item) => (
          <div
            key={item.value}
            onClick={() => setType(item.value)}
            className={item.value === type ? activeStyle : defaultStyle}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(CreateAd);
