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
    <Link
      href={`/product/${item.slug}`}
      className="card w-full rounded-2xl border border-transparent bg-white shadow-none transition-colors hover:border-gray-300 sm:rounded-[24px] sm:hover:border-gray-500"
    >
      <div className="card-body gap-0 p-3 sm:p-4 md:p-6">
        {/* Product Information */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {/* Product Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:h-12 sm:w-12 sm:rounded-[15px] sm:text-[28px] md:h-[50px] md:w-[50px] md:text-[30px]">
            {item.image || item.categoryIcon}
          </div>

          {/* Product Name */}
          <div className="min-w-0 flex-1 leading-tight">
            <h2 className="break-words text-sm font-semibold text-[#111c18] sm:text-base">
              {item.nameBn}
            </h2>

            <p className="mt-1 text-xs text-[#66756d] sm:text-sm md:text-[15px]">
              প্রতি {unitBn[item.unit] || item.unit}
            </p>
          </div>
        </div>

        {/* Today's Price */}
        <div className="mt-4 flex items-end justify-between gap-2 sm:mt-5 sm:gap-3">
          <div className="min-w-0">
            <p className="text-xs text-[#718078] sm:text-sm">
              আজকের দাম
            </p>

            <div className="mt-1 flex flex-wrap items-baseline gap-1">
              <span className="text-lg leading-none font-bold text-[#14221b] sm:text-xl md:text-[23px]">
                {item.today.toLocaleString("bn-BD")}
              </span>

              <span className="text-sm sm:text-base md:text-[17px]">
                টাকা
              </span>
            </div>
          </div>

          {/* Price Change Badge */}
          <div
            className={`badge h-auto shrink-0 gap-1 rounded-full border-0 px-2 py-1 text-[11px] sm:px-3 sm:text-xs md:text-sm ${
              item.change.dir === "up"
                ? "bg-[#f0f5f0] text-red-500"
                : item.change.dir === "down"
                  ? "bg-[#f0f5f0] text-green-500"
                  : "bg-[#f0f5f0] text-gray-500"
            }`}
          >
            <span>
              {item.change.dir === "up"
                ? "▲"
                : item.change.dir === "down"
                  ? "▼"
                  : "—"}
            </span>

            <span>
              {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
