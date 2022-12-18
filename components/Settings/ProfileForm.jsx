import React, { useState } from "react";
import { Form, Formik } from "formik";
import UploadPicture from "../Registeration/UploadPicture";
import InputHandler from "../General/InputHandler";
import { ButtonGroup, Grid } from "@mui/material";
import { images } from "../../constants";
import { useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Image from "next/image";

function ProfileForm(props) {
  const [country, setCountry] = useState("");
  const [govern, setGovern] = useState("");
  const dispatch = useDispatch();

  //   const onSubmit = (data) => {
  //     dispatch(updateProfile({ id: profile_id, setData, data }));
  //   };

  return (
    <div className="w-full p-2">
      <Formik initialValues={{ name: "Saif Mohamed" }}>
        {({ values }) => (
          <Form style={{ height: "100%" }}>
            <div className="flex items-start lg:items-center justify-start gap-[20px] flex-col lg:flex-row">
              <div className="min-w-[200px]">
                <UploadPicture name={"profile_photo"} />
              </div>
              <div className="flex w-full items-center max-w-[600px] relative">
                <InputHandler
                  name={"name"}
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
                  name={"phone"}
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
                <button type="submit" className="mainBTN flex-1">
                  Save
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
