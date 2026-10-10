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
    <div className="w-full max-w-6xl mx-auto px-5 my-7" id="সব-পণ্য">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-extrabold text-2xl">সব পণ্য</h2>
          <p className="text-gray-500">{`মোট ${data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}</p>
        </div>

        {/* sort by */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
          <label className="font-semibold text-sm whitespace-nowrap">
            সাজান
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select border w-full"
          >
            <option value="ডিফল্ট">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>
      {/* -------------------- */}

      <div className="grid grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
