import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import PersonalInfoForm from "../components/Registeration/PersonalInfoForm";
import CustomizedSteppers from "../components/Registeration/Stepper";
import UserTypeForm from "../components/Registeration/UserTypeForm";

const RenderFormByStep = () => {
  const router = useRouter();
  const { step } = router.query;
  const currentStep = parseInt(step);

  switch (currentStep) {
    case 2:
      return <PersonalInfoForm />;
    case 3:
      return <UserTypeForm />;
    default:
      return;
  }
};

const ProfileSetup = () => {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Shaqa - Setup your profile</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Profile Setup page - Shaqa, Real Estate"
          key="Profile-Setup-Page"
        />
      </Head>
      <div className="pt-[40px] md:pt-[60px]">
        <CustomizedSteppers />
      </div>
      <RenderFormByStep />
    </div>
  );
};

export default ProfileSetup;
