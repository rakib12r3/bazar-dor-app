import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-5 sm:py-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 text-center sm:px-5 md:flex-row md:items-center md:justify-between md:gap-5 md:text-left">
        <p className="text-sm leading-6 text-gray-500 sm:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-sm leading-6 text-gray-500 sm:text-base md:max-w-md md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
