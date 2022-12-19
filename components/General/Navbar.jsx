import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu2 as MenuIcon } from "tabler-icons-react";
import { toggleDrawer } from "../../features/drawer/drawerSlice";
import { images } from "../../constants";
import { Avatar } from "@mantine/core";

const Links = [
  { name: "Home", href: "/landing" },
  { name: "Service", href: "/landing/#services" },
  { name: "About Us", href: "/landing/#about" },
  { name: "Contact Us", href: "/landing/#contact" },
];

const NonAuthNav = ({ light }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [scrolling, setScrolling] = useState(false);

  const AuthedSection = ({ userImage }) => (
    <div className="hidden xl:flex items-center gap-[24px] xl:gap-[32px]">
      {/* <div>
        <Image
          className={"cursor-pointer"}
          alt="Chat Icon"
          src={images.chatIconNew}
          width={32}
          height={32}
        />
      </div> */}
      <div>
        <Avatar
          radius={"xl"}
          size={66}
          className={"cursor-pointer"}
          src={
            "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
          }
          alt={"User Profile Picture"}
          onClick={() => {
            router.push({
              pathname: "/settings",
              query: {
                setting: "profile",
              },
            });
          }}
        />
      </div>
    </div>
  );

  const NonAuthSection = () => (
    <div className="xl:flex md:items-center hidden">
      <ul className={"flex items-center gap-[32px]"}>
        {Links?.map(({ href, name }) => {
          return (
            <li
              key={name}
              className={`${
                light ? "text-main" : "text-white"
              } text-[14px] md:text-[18px] hover:fade animate`}
            >
              <Link href={href}>{name}</Link>
            </li>
          );
        })}
      </ul>
      <div className="ml-[120px] flex items-center gap-[32px]">
        <a
          className={`${
            light ? "text-main" : "text-white"
          } hover:fade text-[18px] animate cursor-pointer`}
          onClick={() => {
            router.push({
              pathname: "/login",
            });
          }}
        >
          Login
        </a>
        <a
          className={`
          ${light ? "bg-main" : "bg-white"}
          ${light ? "text-white" : "text-main"}
          rounded-full py-4 px-8 active:fade animate cursor-pointer`}
          onClick={() => {
            router.push({
              pathname: "/register",
            });
          }}
        >
          Sign up
        </a>
      </div>
    </div>
  );

  return (
    <div
      className={`flex ${
        scrolling ? "fixed" : "relative"
      } w-full z-50 items-center justify-between animate duration-700 ease-in-out py-4 px-4 md:py-[12px] md:px-[120px] shadow-lg shadow-[rgba(0,0,0,0.1)] ${
        light ? "bg-white" : "bg-secondary"
      } text-white`}
    >
      <div className="flex items-center gap-[24px]">
        <MenuIcon
          size={32}
          className={"cursor-pointer"}
          onClick={() => dispatch(toggleDrawer())}
          color={light ? "black" : "white"}
        />
        <Image
          onClick={() =>
            router.push({
              pathname: "/",
            })
          }
          src={require(light
            ? "../../assets/images/logo-dark.png"
            : "../../assets/images/logo.png")}
          className={
            "max-w-[80px] cursor-pointer md:max-w-[100px] hover:scale-110 animate duration-300 ease-out"
          }
          alt={"Shaqa Realestate logo"}
        />
      </div>
      {user ? <AuthedSection /> : <NonAuthSection />}
    </div>
  );
};

export default NonAuthNav;
