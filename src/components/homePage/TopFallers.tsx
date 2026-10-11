
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
    <div className="mx-auto mt-5 w-full max-w-6xl px-3 sm:px-5">
      <h2 className="mb-3 mt-5 flex items-baseline gap-2 sm:gap-3">
        <span className="text-green-500">▼</span>
        <span className="text-xl font-extrabold sm:text-2xl">
          আজ দাম কমেছে
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {topFallers.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default TopFallers;
