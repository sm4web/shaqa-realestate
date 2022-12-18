import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import SeekingIcon from "../../assets/icons/seeking-icon.png";
import OfferingIcon from "../../assets/icons/offering-icon.png";

import { useRouter } from "next/router";

import Image from "next/image";

export const ContainerStyle = {
  flexGrow: 1,
  height: "calc(100vh - 100px)",
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const Card = {
  bgcolor: "#F8F8FA",
  width: {
    xl: "175px",
    md: "140px",
    xs: "130px",
  },
  height: {
    xl: "175px",
    md: "140px",
    xs: "130px",
  },
  borderRadius: "10px",
  color: "#2C4CC9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "24px",
  userSelect: "none",
  cursor: "pointer",
  transition: "all ease-in .2s",
  boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
  fontSize: {
    xl: "24px",
    lg: "24px",
    md: "20px",
    xs: "16px",
  },
  img: {
    width: { xl: "48px", md: "42px", xs: "32px" },
    userSelect: "none",
  },
  "&:active": {
    bgcolor: "#2C4CC9",
    color: "#fff",
  },
};

export const CardActive = {
  bgcolor: "#2C4CC9",
  color: "#fff",
  transition: "all ease-in .2s",
};

const UserTypeForm = () => {
  const [active, setActive] = useState("seeking");
  const router = useRouter();
  const Options = [
    { label: "Seeking", img: SeekingIcon, id: "seeking" },
    {
      label: "Offering",
      img: OfferingIcon,
      id: "offering",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-[520px]">
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex justify-center w-full">
            <h1 className="text-lg md:text-4xl">
              Select What you’re looking for ..
            </h1>
          </div>
          <div className="flex justify-center w-full gap-4">
            {Options.map((card) => (
              <Box
                key={card.id}
                onClick={() => setActive(card.id)}
                sx={
                  active === card.id ? { ...Card, ...CardActive } : { ...Card }
                }
              >
                <Image src={card.img} />
                {card.label}
              </Box>
            ))}
          </div>
          <div className="flex justify-start w-full mt-6">
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                <h1 className="font-medium text-md">
                  What Are You looking for ..{" "}
                </h1>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel
                  value="rent"
                  control={<Radio className="mainColor" />}
                  label="Want to rent "
                />
                <FormControlLabel
                  value="buy"
                  control={<Radio className={"mainColor"} />}
                  label="Want to buy"
                />
                <FormControlLabel
                  value="student"
                  control={<Radio className="mainColor" />}
                  label="Search for student house"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="w-full">
            <button
              onClick={() =>
                router.push({
                  pathname: "/",
                })
              }
              className={"mainBTN"}
            >
              Get Started 🤗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeForm;
