
import Image from "next/image";
import React from "react";
import BannerImage from "@/assets/bazar-hero.png";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
      <div className="my-4 rounded-2xl border border-[#dfe8df] bg-[#fafcfb] px-4 py-4 sm:my-6 sm:px-6 md:px-3 md:py-2">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-6">
          <div className=" md:max-w-[600px]">
            <p className="mt-1">
              <span className="inline-block rounded-full bg-[#e1f3e7] px-2.5 py-1 text-[10px] font-medium text-[#05893E] sm:text-xs">
                {date}
              </span>
            </p>

            <h1 className="py-2 text-xl font-extrabold leading-tight tracking-tight text-[#202a22] sm:text-2xl md:text-[28px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="py-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-3 inline-block rounded-lg bg-[#05893E] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-green-800 sm:text-sm"
            >
              সব পণ্য দেখুন
            </a>
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
