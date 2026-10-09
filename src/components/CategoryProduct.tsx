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
      <div className="flex items-center justify-between">
        <p>{`মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
        <label className="font-semibold text-sm">
          সাজান
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select border w-full sm:w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-[50px]">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;