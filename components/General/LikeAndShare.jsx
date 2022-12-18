import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

const IconContainer = ({ children }) => {
  return (
    <div className="animate active:fade w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] rounded-full flex items-center justify-center bg-verylightmain">
      {children}
    </div>
  );
};

const LikeAndShare = ({adID}) => {
  return (
    <div className="flex items-center gap-[12px]">
      <IconContainer>
        <FavoriteBorderIcon
          sx={{
            color: "#2C4CC9",
            fontSize: { md: "24px", lg: "28px", xl: "32px" },
          }}
        />
      </IconContainer>
      <IconContainer>
        <ShareIcon
          sx={{
            color: "#2C4CC9",
            fontSize: { md: "24px", lg: "28px", xl: "32px" },
          }}
        />
      </IconContainer>
    </div>
  );
};

export default LikeAndShare;
