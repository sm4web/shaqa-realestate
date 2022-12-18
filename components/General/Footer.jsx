import Image from "next/image";
import Link from "next/link";
import React from "react";

const Links = [
  { name: "Home", href: "/landing" },
  { name: "Service", href: "/landing/#services" },
  { name: "About Us", href: "/landing/#about" },
  { name: "Contact Us", href: "/landing/#contact" },
];

const Footer = () => {
  return (
    <div className="w-full container border-t-2 py-12 border-[#DEDFE1] static mt-[240px] bottom-0 ">
      <div className="px-[15%] flex flex-col lg:flex-row gap-[32px] items-center justify-between">
        <Image src={require("../../assets/images/logo-dark.png")} width={120} />
        <ul className={"flex flex-col lg:flex-row items-center gap-[32px]"}>
          {Links?.map(({ href, name }) => {
            return (
              <li
                key={name}
                className={"text-[14px] md:text-[18px] hover:fade animate"}
              >
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text-center mt-[70px]">
        Copyright © 2023 Shaqa . All Rights Reseved.
      </div>
    </div>
  );
};
export default Footer;
