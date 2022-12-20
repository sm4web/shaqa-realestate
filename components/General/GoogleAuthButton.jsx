import Image from "next/image";
import React from "react";

const GoogleAuthButton = ({ handleClick }) => {
  return (
    <button
      type="button"
      className="animate bg-[#ECF2F7] text-[#9a9a9a] flex items-center justify-center gap-[32px] hover:fade mainBTN w-full"
      onClick={handleClick}
    >
      <Image
        src={require("../../assets/icons/google-icon.svg")}
        width={32}
        height={32}
      />
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
