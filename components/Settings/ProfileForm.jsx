import React, { useState } from "react";
import { Form, Formik } from "formik";
import UploadPicture from "../Registeration/UploadPicture";
import InputHandler from "../General/InputHandler";
import { ButtonGroup, Grid } from "@mui/material";
import { images } from "../../constants";
import { useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Image from "next/image";
import SimpleSnackbar from "../General/Snackbar";
import { updateUserData } from "../../features/user/userSlice";
import loadingImage from "../../assets/images/Fading word.gif";

function ProfileForm({ userData }) {
  if (!userData) return null;

  const { city, country: state } = userData;
  const dispatch = useDispatch();
  const [country, setCountry] = useState(state || "");
  const [govern, setGovern] = useState(city || "");
  const [saved, setSaved] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleUpdateUser = (data) => {
    dispatch(updateUserData({ data, uid: userData.uid }));
  };

  return (
    <div className="w-full p-2">
      <Formik
        initialValues={{
          ...userData,
        }}
        onSubmit={(values) => {
          handleUpdateUser(values);
          setSaved(true);
        }}
      >
        {({ values }) => (
          <Form style={{ height: "100%" }}>
            {/* Snackbar when user data updated... */}
            {saved && (
              <SimpleSnackbar text={"User data updated successfully."} />
            )}
            {/* Snackbar when profile photo uploaded to database... */}
            {imageLoading && (
              <SimpleSnackbar text={"Profile photo is being uploaded..."} />
            )}
            <div className="flex items-start lg:items-center justify-start gap-[20px] flex-col lg:flex-row">
              <div className="min-w-[200px]">
                <UploadPicture
                  url={userData?.profile_photo}
                  setImageLoading={setImageLoading}
                />
              </div>
              <div className="flex w-full items-center max-w-[600px] relative">
                <InputHandler
                  name={"displayName"}
                  className={"bg-transparent outline-none text-4xl border-none"}
                />
                <Image
                  src={images.editIcon}
                  width={32}
                  height={32}
                  className={"absolute right-0 top-2"}
                  alt="Clear Icon"
                />
              </div>
            </div>
            <Grid container sx={{ mt: 4 }} spacing={6}>
              <Grid item xs={12} md={6}>
                <InputHandler
                  name={"email"}
                  label={"Email"}
                  placeholder={"Enter Your Email Address"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputHandler
                  name={"phoneNumber"}
                  label={"Phone Number"}
                  placeholder={"Enter Your Phone Number"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="flex flex-col gap-[6px]">
                  <h1 className={"text-[16px] lg:text-[20px]"}>Country</h1>
                  <CountryDropdown
                    value={country}
                    className={"mainInput"}
                    onChange={(value) => {
                      setCountry(value);
                      values.country = value;
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="flex flex-col gap-[6px]">
                  <h1 className={"text-[16px] lg:text-[20px]"}>State</h1>
                  <RegionDropdown
                    country={country}
                    value={govern}
                    className={"mainInput"}
                    onChange={(value) => {
                      setGovern(value);
                      values.city = value;
                    }}
                  />
                </div>
              </Grid>
            </Grid>
            <div className="w-full mt-[32px] lg:mt-[60px]">
              <ButtonGroup sx={{ width: "100%", gap: "12px" }} gap={4}>
                <button className="mainBTN flex-1 border-2 border-red-500 text-red-500 bg-white">
                  Cancel
                </button>
                <button
                  disabled={imageLoading}
                  type="submit"
                  className={
                    imageLoading
                      ? "mainBTN flex-1 bg-gray-500"
                      : "mainBTN flex-1"
                  }
                >
                  {imageLoading ? "Loading..." : "Save"}
                </button>
              </ButtonGroup>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileForm;
