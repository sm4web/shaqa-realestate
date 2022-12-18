import React, { useRef } from "react";
import Box from "@mui/material/Box";

import { images } from "../../constants";
import { useFormikContext } from "formik";
import Image from "next/image";

const UploadImages = ({ name }) => {
  const formikProps = useFormikContext();
  const ref = useRef();

  const handleImageSelect = () => {
    ref.current.click();
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    formikProps.setFieldValue(name, [
      ...formikProps.values.images,
      e.target.files[0],
    ]);
  };

  return (
    <Box sx={UploadImagesStyle}>
      <Box sx={UploadImages__Header}>
        <h3>Upload Images</h3>
        <Image
          onClick={handleImageSelect}
          src={images.UploadImagesIcon}
          width={48}
          height={48}
          alt="Add Image Button"
        />
        <input
          onChange={handleImageChange}
          ref={ref}
          style={{ display: "none" }}
          type={"file"}
          accept={"image/*"}
        />
      </Box>
      <Box sx={UploadImages__ImagesContainer}>
        {formikProps.values.images?.map((img, index) => (
          <img
            key={index}
            className={
              "stockShadow animate duration-300 ease-in-out mainBorder"
            }
            src={URL.createObjectURL(img)}
            width={320}
            alt=""
          />
        ))}
      </Box>
    </Box>
  );
};

const UploadImagesStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: { md: "24px", xs: "12px" },
};

const UploadImages__Header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  h3: {
    fontSize: "20px",
  },
};

const UploadImages__ImagesContainer = {
  display: "flex",
  alignItems: "center",
  gap: { md: "12px", xs: "24px" },
  overflowX: "scroll",
  padding: "12px 0",

  img: {
    width: "300px",
    height: "230px",
    objectFit: "contain",
    borderRadius: "10px",
  },
};

export default UploadImages;
