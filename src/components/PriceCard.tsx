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
    dir: "up" | "down";
    pct: number;
  };
  markets: IMarket[];
}

interface PriceDetailsCardProps {
  data: IPriceData;
}

// const formatPrice = (price: number) =>
//   new Intl.NumberFormat("bn-BD", {
//     maximumFractionDigits: 2,
//   }).format(price);
function formatPrice(price: number) {
  const formattedPrice = price.toLocaleString("bn-BD");
  return formattedPrice;
}



  
const PriceDetailsCard = ({ data }: PriceDetailsCardProps) => {
  const markets = [...data.markets].sort((a, b) => a.max - b.max);

  const minPrice = Math.min(...markets.map((item) => item.min));
  const maxPrice = Math.max(...markets.map((item) => item.max));

  // প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়
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
    <div className="w-full rounded-2xl border border-[#dfe8df] bg-white mt-5 p-4 sm:p-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Lowest Price */}
        <div className="rounded-2xl border border-[#dfe8df] bg-transparent p-4">
          <p className="text-xs font-medium text-gray-600">
            সর্বনিম্ন দাম
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-600">
            {formatPrice(minPrice)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            সবচেয়ে কম দামের বাজার
          </p>
        </div>

        {/* Highest Price */}
        <div className="rounded-2xl border border-[#dfe8df] bg-transparent p-4">
          <p className="text-xs font-medium text-gray-600">
            সর্বাধিক দাম
          </p>

          <h3 className="mt-1 text-2xl font-bold text-red-500">
            {formatPrice(maxPrice)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            সবচেয়ে বেশি দামের বাজার
          </p>
        </div>

        {/* Average Price */}
        <div className="rounded-2xl border border-[#dfe8df] bg-transparent p-4">
          <p className="text-xs font-medium text-gray-600">
            গড় দাম
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-600">
            {formatPrice(Math.round(averagePrice))}
            <span className="text-sm font-medium">টাকা</span>
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            প্রতি {unitBn[data.unit]} হিসেবে
          </p>
        </div>
      </div>

      {/* Market Table Heading */}
      <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-[#202a22] sm:text-xl">
          বাজারভিত্তিক আজকের দাম
        </h2>

     
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-[#dfe8df]">
        <table className="table w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="border-b border-[#dfe8df] text-sm text-gray-500">
              <th className="px-4 py-4 font-semibold">বাজার</th>
              <th className="px-4 py-4 font-semibold">বিভাগ</th>
              <th className="px-4 py-4 text-right font-semibold">
                সর্বনিম্ন
              </th>
              <th className="px-4 py-4 text-right font-semibold">
                সর্বাধিক
              </th>
              <th className="px-4 py-4 text-right font-semibold">
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
                  className={`border-b border-[#dfe5df] text-sm text-[#273129] transition-colors ${
                    index % 2 === 1 ? "bg-[#eff4ef]" : "bg-transparent"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    {item.market}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    {item.division}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    {formatPrice(item.min)} টাকা
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    {formatPrice(item.max)} টাকা
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right font-bold">
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
