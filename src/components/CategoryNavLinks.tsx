'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface INavs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}



const CategoryNavLinks = ({data}:{data:INavs[]}) => {
   const pathname = usePathname();
  return (
 
   <div className="border-y border-gray-100">
      <div className="mx-auto flex w-full max-w-6xl gap-5 overflow-x-auto px-5 py-2">
        {data.map((item) => {
          const isActive = pathname === `/category/${item.slug}`;

          return (
            <Link
              href={`/category/${item.slug}`}
              key={item.id}
              className={`shrink-0 rounded-[10px] px-3 py-1 transition-colors ${
                isActive
                  ? "bg-[#05893E] text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <p>
                <span>{item.icon} </span>
                {item.nameBn}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavLinks;