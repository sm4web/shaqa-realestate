import React, { useRef } from "react";
import UploadPic from "../../assets/icons/upload-profile-picture.png";
import { useFormikContext } from "formik";
import Image from "next/image";

const UploadPicture = ({ name }) => {
  const formikProps = useFormikContext();
  const ref = useRef();
  const formValue = formikProps.values[name];

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
      onClick={formValue ? handleRemoveImageLocally : handleChange}
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
          typeof formValue === "string"
            ? formValue
            : formValue
            ? URL.createObjectURL(
                new Blob([formValue], { type: "image/png+xml" })
              )
            : UploadPic
        }
        className={"w-[160px] h-[160px] m-auto rounded-full object-cover"}
        alt="User profile"
      />
      <h1 className="text-sm mainColor">
        {formValue ? "Remove profile picture" : "Upload profile picture"}
      </h1>
    </div>
  );
};

export default UploadPicture;
