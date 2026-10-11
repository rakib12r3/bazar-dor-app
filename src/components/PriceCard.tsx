import React from "react";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IPriceData {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: IMarket[];
}

interface PriceDetailsCardProps {
  data: IPriceData;
}

function formatPrice(price: number) {
  const formattedPrice = price.toLocaleString("bn-BD");
  return formattedPrice;
}

const PriceDetailsCard = ({ data }: PriceDetailsCardProps) => {
  const markets = [...data.markets].sort((a, b) => a.max - b.max);

  const minPrice = Math.min(...markets.map((item) => item.min));
  const maxPrice = Math.max(...markets.map((item) => item.max));

  const averagePrice =
    markets.reduce((total, item) => total + (item.min + item.max) / 2, 0) /
    markets.length;

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
  };

  return (
    <div className="mt-5 w-full rounded-2xl border border-[#dfe8df] bg-white p-3 sm:p-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {/* Lowest Price */}
        <div className="rounded-2xl border border-[#dfe8df] p-3 sm:p-4">
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            সর্বনিম্ন দাম
          </p>

          <h3 className="mt-1 text-xl font-bold text-green-600 sm:text-2xl">
            {formatPrice(minPrice)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            সবচেয়ে কম দামের বাজার
          </p>
        </div>

        {/* Highest Price */}
        <div className="rounded-2xl border border-[#dfe8df] p-3 sm:p-4">
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            সর্বাধিক দাম
          </p>

          <h3 className="mt-1 text-xl font-bold text-red-500 sm:text-2xl">
            {formatPrice(maxPrice)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            সবচেয়ে বেশি দামের বাজার
          </p>
        </div>

        {/* Average Price */}
        <div className="rounded-2xl border border-[#dfe8df] p-3 sm:col-span-2 sm:p-4 lg:col-span-1">
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            গড় দাম
          </p>

          <h3 className="mt-1 text-xl font-bold text-green-600 sm:text-2xl">
            {formatPrice(Math.round(averagePrice))}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            প্রতি {unitBn[data.unit] ?? data.unit} হিসেবে
          </p>
        </div>
      </div>

      {/* Market Table Heading */}
      <div className="mb-3 mt-5 flex flex-wrap items-center justify-between gap-2 sm:mt-6">
        <h2 className="text-base font-bold text-[#202a22] sm:text-lg md:text-xl">
          বাজারভিত্তিক আজকের দাম
        </h2>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#dfe8df] sm:rounded-2xl">
        <table className="table w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-[#dfe8df] text-xs text-gray-500 sm:text-sm">
              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                বাজার
              </th>

              <th className="px-3 py-3 font-semibold sm:px-4 sm:py-4">
                বিভাগ
              </th>

              <th className="px-3 py-3 text-right font-semibold sm:px-4 sm:py-4">
                সর্বনিম্ন
              </th>

              <th className="px-3 py-3 text-right font-semibold sm:px-4 sm:py-4">
                সর্বাধিক
              </th>

              <th className="px-3 py-3 text-right font-semibold sm:px-4 sm:py-4">
                গড়
              </th>
            </tr>
          </thead>

          <tbody>
            {markets.map((item, index) => {
              const marketAverage = (item.min + item.max) / 2;

              return (
                <tr
                  key={`${item.market}-${index}`}
                  className={`border-b border-[#dfe5df] text-xs text-[#273129] transition-colors sm:text-sm ${
                    index % 2 === 1 ? "bg-[#eff4ef]" : "bg-transparent"
                  }`}
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium sm:px-4 sm:py-4">
                    {item.market}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">
                    {item.division}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4 sm:py-4">
                    {formatPrice(item.min)} টাকা
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4 sm:py-4">
                    {formatPrice(item.max)} টাকা
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-right font-bold sm:px-4 sm:py-4">
                    {formatPrice(marketAverage)} টাকা
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceDetailsCard;
