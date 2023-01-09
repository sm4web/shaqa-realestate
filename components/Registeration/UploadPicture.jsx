import React, { useRef, useState } from "react";
import UploadPic from "../../assets/icons/upload-profile-picture.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import uploadProfilePic from "../../utils/uploadProfilePictureToFirebase";

const UploadPicture = ({ url, setImageLoading }) => {
  const [image, setImage] = useState(url || null);
  const ref = useRef();
  const { uid } = useSelector((state) => state.auth.data.user);

  const handleChange = () => {
    ref.current.click();
  };

  const handleImageLocally = async (e) => {
    setImageLoading(true);
    setImage(e.target.files[0]);
    await uploadProfilePic(e.target.files[0], uid);
    setImageLoading(false);
  };

  const handleRemoveImageLocally = () => {
    setImage(null);
  };

  return (
    <div
      className="text-center animate hover:fade cursor-pointer mb-4"
      onClick={image ? handleRemoveImageLocally : handleChange}
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
          typeof image === "string"
            ? image
            : image
            ? URL.createObjectURL(new Blob([image], { type: "image/png+xml" }))
            : UploadPic
        }
        className={"w-[160px] h-[160px] m-auto rounded-full object-cover"}
        alt="User profile"
      />
      <h1 className="text-sm mainColor">
        {image ? "Remove profile picture" : "Upload profile picture"}
      </h1>
    </div>
  );
};

export default UploadPicture;
