import React, { useRef } from "react";
import UploadPic from "../../assets/icons/upload-profile-picture.png";
import { useFormikContext } from "formik";
import Image from "next/image";

const UploadPicture = ({ name }) => {
  const formikProps = useFormikContext();
  const ref = useRef();

  const handleChange = () => {
    ref.current.click();
  };

  const handleImageLocally = (e) => {
    formikProps.setFieldValue(name, e.target.files[0]);
  };

  const handleRemoveImageLocally = () => {
    formikProps.setFieldValue(name, null);
  };

  return (
    <div
      className="text-center animate hover:fade cursor-pointer mb-4"
      onClick={
        formikProps.values[name] ? handleRemoveImageLocally : handleChange
      }
    >
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={ref}
        style={{ display: "none" }}
        onChange={handleImageLocally}
      />
      <Image
        width={160}
        height={160}
        src={
          formikProps.values[name]
            ? URL.createObjectURL(formikProps.values[name])
            : UploadPic
        }
        className={"w-[160px] h-[160px] m-auto rounded-full object-cover"}
        alt="User profile"
      />
      <h1 className="text-sm mainColor">
        {formikProps.values[name]
          ? "Remove profile picture"
          : "Upload profile picture"}
      </h1>
    </div>
  );
};

export default UploadPicture;
