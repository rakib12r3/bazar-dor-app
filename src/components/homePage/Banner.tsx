import Image from "next/image";
import React from "react";
import BannerImage from "@/assets/bazar-hero.png";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
      <div className="my-4 rounded-2xl bg-white px-4 py-5 sm:my-6 sm:px-6 md:px-8 md:py-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <div className="w-full md:max-w-[600px]">
            <p className="mt-2 sm:mt-3">
              <span className="inline-block rounded-2xl bg-green-100 px-3 py-1 text-xs text-[#05893E] sm:text-sm">
                {date}
              </span>
            </p>

            <h1 className="py-2 text-2xl font-extrabold leading-snug sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="py-3 text-sm leading-7 text-gray-500 sm:py-4 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="inline-block rounded-[10px] bg-[#05893E] px-4 py-2 text-sm text-white transition-colors hover:bg-green-800 sm:px-5 sm:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="w-full md:flex-1">
            <Image
              src={BannerImage}
              alt="আজকের বাজারের পণ্য"
              className="h-auto w-full rounded-xl object-contain"
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1152px) 50vw, 550px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
