import Link from "next/link";
import React from "react";
import CategoryNavLinks from "./CategoryNavLinks";
import baseURL from "./baseURL/BaseUrl";



const NavLinks = async () => {
  const res = await fetch(
    `${baseURL}/categories`,
  );
  const data = await res.json();

  return (
    <CategoryNavLinks data={data}/>
   
  );
};

export default NavLinks;
