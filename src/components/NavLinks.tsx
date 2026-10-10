import Link from "next/link";
import React from "react";
import CategoryNavLinks from "./CategoryNavLinks";
import baseURL from "./baseURL/BaseUrl";



const NavLinks = async () => {
  const res = await fetch(
    `${baseURL}/categories`,
  );
  const data = await res.json();
  console.log(data,'from Nav Links');

  return (
    <CategoryNavLinks data={data}/>
    // <div className="border-y border-gray-100">
    //   <div className="flex gap-5 w-full max-w-6xl mx-auto px-5 py-2">
    //     {data.map((item) => (
    //       <Link href={`/category/${item.slug}`}
    //         className="hover:bg-gray-200 px-3 py-1 rounded-[10px]"
    //         key={item.id}
    //       >
    //         <p>
    //           <span>{item.icon}</span>
    //           {item.nameBn}
    //         </p>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
  );
};

export default NavLinks;
