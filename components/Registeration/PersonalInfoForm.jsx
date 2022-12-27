import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import UploadPicture from "./UploadPicture";
import InputHandler from "../General/InputHandler";
import { updateUserData } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import uploadProfilePic from "../../utils/uploadProfilePictureToFirebase";

const initValues = { profile_photo: null, phone_number: "" };

const PersonalInfoForm = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { uid } = useSelector((state) => state.auth.data.user);

  const handleRedirect = () => {
    router.push({
      pathname: "/profile-setup",
      query: {
        step: 3,
      },
    });
  };

  return (
    <div className="flex flex-col flex-1 md:flex-none items-center justify-center mt-4 md:mt-[60px] p-2">
      <div className="w-full md:w-[500px]">
        <Formik
          initialValues={initValues}
          onSubmit={async (values) => {
            // uploadProfilePic(values.profile_photo, uid); // isolate to upload images module -frontend
            dispatch(updateUserData({ data: values, uid }));
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-[24px] w-full">
              <UploadPicture name={"profile_photo"} />
              <InputHandler
                type="tel"
                label={"Phone Number"}
                name={"phone_number"}
                placeholder={"Phone Number"}
              />
              <div>
                <h1 className="font-medium text-[16px] md:text-[20px]">
                  Country
                </h1>
                <CountryDropdown
                  value={country}
                  className={"mainInput w-full appearance-none mt-2 p-4"}
                  onChange={(value) => {
                    setCountry(value);
                    values.country = value;
                  }}
                />
              </div>
              <div>
                <h1 className="font-medium text-[16px] md:text-[20px]">
                  State
                </h1>
                <RegionDropdown
                  country={country}
                  value={region}
                  className={"mainInput w-full appearance-none mt-2 p-4"}
                  onChange={(value) => {
                    setRegion(value);
                    values.city = value;
                  }}
                />
              </div>
              <button type={"submit"} className={"mainBTN animate hover:fade"}>
                Next
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
