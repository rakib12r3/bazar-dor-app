"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface INavs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const CategoryNavLinks = ({ data }: { data: INavs[] }) => {
  const pathname = usePathname();

  return (
    <div className="border-y border-gray-100">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-3 py-2 sm:gap-3 sm:px-5 md:gap-4 lg:gap-5">
        {data.map((item) => {
          const isActive = pathname === `/category/${item.slug}`;

          return (
            <Link
              href={`/category/${item.slug}`}
              key={item.id}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
                isActive
                  ? "bg-[#05893E] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>{" "}
              {item.nameBn}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavLinks;
