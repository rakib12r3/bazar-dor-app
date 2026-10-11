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

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
          <div className="flex items-center justify-between gap-3 py-3 sm:py-4 md:py-5">
            {/* Left div */}
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 sm:gap-3"
            >
              <div className="shrink-0 rounded-xl bg-green-700 p-2 sm:rounded-2xl sm:p-3">
                <Image
                  className="brightness-0 invert opacity-90"
                  src={Logo}
                  alt="Logo"
                  height={30}
                  width={30}
                  priority
                  sizes="(max-width: 640px) 24px, 30px"
                />
              </div>

              <div className="min-w-0">
                <p className="text-base font-extrabold sm:text-lg">
                  বাজার দর
                </p>

                <span className="block text-xs text-[#1D271F] sm:text-sm">
                  {date}
                </span>
              </div>
            </Link>

            {/* Right div */}
            <div className="flex shrink-0 items-center gap-2">
              <UserInfo />
            </div>
          </div>
        </div>

        <NavLinks />
      </div>

      <div className="w-full overflow-hidden border-y border-gray-100">
        <Marquee />
      </div>
    </>
  );
};

export default Navbar;
