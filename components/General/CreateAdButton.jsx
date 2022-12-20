import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const CreateAdButton = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={() => router.push({ pathname: "/create-ad" })}
        className="animate active:fade bg-main text-white rounded-full w-[56px] h-[56px] lg:w-[72px] lg:h-[72px] flex items-center justify-center"
      >
        <AddIcon sx={{ fontSize: {xs:"32px", lg:"48px"} }} />
      </button>
    </div>
  );
};

export default CreateAdButton;
