"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface ICategoryProduct {
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
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface IProps {
  products: ICategoryProduct[];
}

const CategoryProducts = ({ products }: IProps) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "asc") {
      return a.today - b.today;
    }

    if (sortBy === "desc") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-500 sm:text-base">
          {`মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        </p>

        <div className="mb-2 flex w-full flex-col gap-2 sm:flex-row sm:items-center md:mb-0 md:w-auto">
          <label
            htmlFor="category-product-sort"
            className="shrink-0 text-sm font-semibold sm:text-base"
          >
            সাজান
          </label>

          <select
            id="category-product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select w-full border sm:min-w-52 md:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="mb-[50px] grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;
