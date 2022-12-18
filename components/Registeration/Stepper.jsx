import * as React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2C4CC9",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2CC987",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    width: "75%",
    margin: "auto",
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

export const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "rgba(44,76,201,0.4)",
  zIndex: 1,
  color: "#fff",

  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "rgb(44,76,201)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2CC987",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: 1,
    2: 2,
    3: 3,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      sx={{
        fontSize: { md: "20px", xs: "12px" },
        width: { md: 50, xs: 32 },
        height: { md: 50, xs: 32 },
      }}
    >
      {!active ? "✓" : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Create an account",
  "Complete your profile",
  "What are you going to do",
];

export default function CustomizedSteppers() {
  const router = useRouter();
  const { step } = router.query;

  const currentStep = parseInt(step);
  return (
    <Stack sx={{ maxWidth: { md: "720px", xs: "100%" }, margin: "auto" }}>
      <Stepper
        alternativeLabel
        activeStep={currentStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography
                variant={"h3"}
                sx={{
                  fontSize: { md: "18px", xs: "12px" },
                }}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
