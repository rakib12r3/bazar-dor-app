import React from "react";
import CategoryNavLinks from "./CategoryNavLinks";
import baseURL from "./baseURL/BaseUrl";

const NavLinks = async () => {
  const res = await fetch(`${baseURL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return (
    <nav className="w-full border-t border-gray-100">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
        <CategoryNavLinks data={data} />
      </div>
    </nav>
  );
};

export default NavLinks;
