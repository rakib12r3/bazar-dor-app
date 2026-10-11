"use client";

import React, { useState } from "react";
import ProductCard from "../ProductCard";

interface IAllProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const AllProducts = ({ data }: { data: IAllProduct[] }) => {
  console.log(data, "from all products");

  const [sortBy, setSortBy] = useState("ডিফল্ট");

  const sortedProducts = [...data].sort((a, b) => {
    if (sortBy === "asc") {
      return a.today - b.today;
    }

    if (sortBy === "desc") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div 
      className="mx-auto my-6 w-full max-w-6xl px-3 sm:my-7 sm:px-5"
      id="সব-পণ্য"
    >
      <div className="mb-4 flex flex-col gap-4 sm:mb-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold sm:text-2xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {`মোট ${data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
          </p>
        </div>

        {/* Sort by */}
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-semibold sm:text-base"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select w-full border border-gray-200 sm:min-w-52 md:w-auto"
          >
            <option value="ডিফল্ট">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
