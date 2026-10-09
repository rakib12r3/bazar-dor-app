import Link from "next/link";
import React from "react";

interface IPriceCardProps {
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

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

const ProductCard = ({ item }: { item: IPriceCardProps }) => {
  const isUp =
    item.change.dir === "up" ||
    item.change.dir === "down" ||
    item.change.dir === "flat";

  return (
    <Link href={`/product/${item.id}`} className="card w-full rounded-[24px] border border-[#dfe6df] bg-[#fbfdfb] shadow-none transition-all duration-200 hover:border-[#cbd8cc] bg-white">
      <div className="card-body gap-0 p-6">
        {/* Product Information */}
        <div className="flex items-center gap-5">
          {/* Product Icon */}
          <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#f0f5f0] text-[30px]">
            {item.image || item.categoryIcon}
          </div>

          {/* Product Name */}
          <div className="min-w-0 flex-1 leading-tight">
            <h2 className="text-[16px]  font-semibold text-[#111c18]">
              {item.nameBn}
            </h2>

            <p className="mt-1 text-[15px] text-[#66756d]">
              প্রতি {unitBn[item.unit]}
            </p>
          </div>
        </div>

        {/* Today's Price */}
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-[#718078]">আজকের দাম</p>

            <div className=" flex items-baseline gap-1">
              <span className="text-[23px] leading-none font-bold text-[#14221b]">
                {item.today.toLocaleString("bn-BD")}
              </span>

              <span className="text-[17px]">টাকা</span>
            </div>
          </div>

          {/* Price Change Badge */}
          <div
            className={`badge h-auto shrink-0 gap-1 rounded-full border-0 px-3 py-1 text-sm  ${
              item.change.dir === "up"
                ? "bg-[#f0f5f0]  text-red-500"
                : item.change.dir === "down"
                  ? "bg-[#f0f5f0] text-green-500"
                  : "bg-[#f0f5f0]"
            }`}
          >
            <span>
              {item.change.dir === "up"
                ? "▲"
                : item.change.dir === "down"
                  ? "▼"
                  : "—"}
            </span>

            <span>{Math.abs(item.change.pct).toLocaleString("bn-BD")}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
