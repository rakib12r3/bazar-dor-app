import React from "react";
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

  return (
    <div className="w-full max-w-6xl mx-auto px-5 my-7">
      <h2 className="font-extrabold text-2xl">সব পণ্য</h2>
      <p className="text-gray-500">{`মোট ${data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}</p>
      <div className="grid grid-cols-3 gap-4">
        {data.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
