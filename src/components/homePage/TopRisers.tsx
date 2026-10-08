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

const TopRisers = async ({data}:{data:ITopRisers[]}) => {
  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  // const data: ITopRisers[] = await res.json();
  const topRisers = data
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Number(b.change.pct) - Number(a.change.pct))
    .slice(0, 6);
  console.log(topRisers, "from TopRisers");

  return (
    <div className="w-full max-w-6xl mx-auto px-5 ">
      <h2 className="flex gap-3 items-baseline mt-5 mb-3"><span className="text-red-500">▲</span>
<span className="font-extrabold text-2xl">আজ দাম বেড়েছে</span></h2>
      <div className="grid grid-cols-3 gap-4">
        {topRisers.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default TopRisers;
