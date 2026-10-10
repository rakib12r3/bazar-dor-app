import Image from "next/image";
import Logo from "@/assets/logo-icon.png";
import React from "react";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  console.log(date);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-5 py-5">
        <div className="flex justify-between items-center ">
          {/* Left div */}
          <Link href={"/"} className="flex items-center gap-3">
            <div className="bg-green-700 p-3 rounded-2xl">
              <Image
                className="brightness-0 invert opacity-90"
                src={Logo}
                alt="Logo"
                height={30}
                width={30}
              />
            </div>
            <div>
              <p className=" font-extrabold text-lg">বাজার দর</p>
              <span className="text-[#1D271F] text-sm">{date}</span>
            </div>
          </Link>

          {/* Right div */}
          <div className="flex items-center gap-2">
            {/* <button className="hover:bg-gray-200 rounded-[10px] px-4  py-[8px]">
              সাইন ইন
            </button>
            <button className=" bg-[#05893E] text-white rounded-[10px] px-4  py-[8px]">
              সাইন আপ
            </button> */}
          <UserInfo />
          </div>
        </div>
      </div>
      <NavLinks />
      <div className="border border-gray-100">
      <Marquee />
      </div>
    </>
  );
};

export default Navbar;
