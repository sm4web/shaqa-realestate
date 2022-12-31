import React from "react";
import Box from "@mui/material/Box";
import { images } from "../constants";

import SettingsProfile from "../components/Settings/ProfileForm";

import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import withAuth from "../hooks/withAuth";
import { useSelector } from "react-redux";

import sha2a from "../app/api/sha2a";

const options = [
  { label: "Profile", subtitle: "Name, Username, Email address" },
  { label: "Password", subtitle: "Your email address is horeyatm@gmail.com" },
  { label: "Notifications", subtitle: "Sha2a will send you notifications" },
];

const renderSettingsSection = (setting, user) => {
  switch (setting) {
    case "profile":
      return <SettingsProfile userData={user} />;

    default:
      break;
  }
};

function Settings(props) {
  const { user } = useSelector((state) => state.auth.data);

  const router = useRouter();

  const { setting } = router.query;

  return (
    <div className="flex flex-col md:flex-row p-4">
      <Head>
        <title>Shaqa - Settings</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Settings Page - Shaqa, Real Estate"
          key="Settings-Page"
        />
      </Head>

      <div className="max-w-[567px] w-full rounded-md bg-[#F5F6Fa] min-h-[576px] shadow-lg shadow-[rgba(0,0,0,0.15)] mr-[7.5%] mb-[12.5%] md:mb-0 p-4">
        <h4 className="text-[18px] md:text-[24px] mb-[45px]">
          User Management
        </h4>
        <div className="flex flex-col gap-[24px]">
          {options?.map((item) => (
            <div
              className="border-b-[1.75px] border-secondary mb-[32px] flex items-center justify-between pb-4 cursor-pointer"
              key={item.label}
              onClick={() =>
                router.push({
                  pathname: "/settings",
                  query: {
                    setting: item.label.toLowerCase(),
                  },
                })
              }
            >
              <Box sx={SettingsDrawer_MenuItem_Left}>
                <h5>{item.label}</h5>
                <p>{item.subtitle}</p>
              </Box>
              {setting === item.label.toLowerCase() ? (
                <Image
                  src={images.settingsArrowLeft}
                  width={24}
                  height={24}
                  alt={"settings sha2a arrow Button icon"}
                />
              ) : (
                <Image
                  src={images.settingsArrowRight}
                  width={24}
                  height={24}
                  alt={"settings sha2a arrow Button icon"}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {renderSettingsSection(setting, user)}
    </div>
  );
}

export const SettingsDrawer_MenuItem_Left = {
  display: "flex",
  flexDirection: "column",
  h5: {
    fontSize: { xs: "16px", md: "20px" },
    marginBottom: "12px",
    color: "#000022",
  },
  p: {
    color: "rgba(0,0,34,0.5)",
  },
};

export default withAuth(Settings);
