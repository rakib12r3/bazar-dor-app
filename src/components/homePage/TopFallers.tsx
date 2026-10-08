import React from "react";
import ProductCard from "../ProductCard";
interface ITopFallers {
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
    dir: string;
    pct: number;
  };
}

const TopFallers = ({ data }: { data: ITopFallers[] }) => {
  const topFallers = data
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Number(a.change.pct) - Number(b.change.pct))
    .slice(0, 6);
  console.log(topFallers, "from TopFallers");

  return (
    <div className="w-full max-w-6xl mx-auto px-5 ">
      <h2 className="flex gap-3 items-baseline mt-5 mb-3">
        <span className="text-green-500">▼</span>
        <span className="font-extrabold text-2xl">আজ দাম কমেছে</span>
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {topFallers.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default TopFallers;
