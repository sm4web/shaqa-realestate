import React from "react";
import { Box, Typography } from "@mui/material";
import { images } from "../../constants";
import { Container } from "./style";

const Container = {
  display: "flex",
  flexDirection: { md: "row", xs: "column-reverse" },
  alignItems: "center",
  gap: "24px",
  height: { md: "100px", xs: "100%" },
  p: 2,
};

const LogoBanner = ({ theme = "light" }) => {
  return (
    <Box sx={Container}>
      <Typography
        variant={"h2"}
        sx={{
          fontSize: { md: "24px", xs: "16px" },
          fontFamil: "GilorySemiBold",
          color: theme === "dark" ? "#0B0E16" : "#fff",
        }}
      >
        Sha2a - For Real State Marketing
      </Typography>
      <Box
        sx={{
          height: { md: "100%", xs: "2px" },
          width: { md: "2px", xs: "100%" },
          bgcolor: theme === "dark" ? "#0B0E16" : "#fff",
        }}
      ></Box>
      <img
        width={120}
        src={theme === "dark" ? images.logoDark : images.logo}
        alt=""
      />
    </Box>
  );
};

export default LogoBanner;
