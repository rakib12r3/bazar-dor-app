import React from "react";
import ProductCard from "../ProductCard";

interface ITopRisers {
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

const TopRisers = async ({ data }: { data: ITopRisers[] }) => {
  const topRisers = data
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Number(b.change.pct) - Number(a.change.pct))
    .slice(0, 6);

  console.log(topRisers, "from TopRisers");

  return (
    <div className="mx-auto mt-5 w-full max-w-6xl px-3 sm:px-5">
      <h2 className="mb-3 mt-5 flex items-baseline gap-2 sm:gap-3">
        <span className="text-red-500">▲</span>
        <span className="text-xl font-extrabold sm:text-2xl">
          আজ দাম বেড়েছে
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {topRisers.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default TopRisers;
