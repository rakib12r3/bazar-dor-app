import PriceDetailsCard from "@/components/PriceCard";
import PriceCard from "@/components/PriceCard";
import React from "react";

interface IDetailsPage {
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
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
  };

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
  );
  const data: IDetailsPage = await res.json();
  // const marketsDetails = data.markets;
  console.log(data, "from details page shdfjhfhjha");

  return (
    <div className="w-full max-w-6xl mx-auto px-5">
      <div className="flex justify-between items-center bg-white px-5 py-3 rounded-3xl">
        <div className="flex items-center gap-5">
          {/* Product Icon */}
          <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#f0f5f0] text-[30px]">
            {data.image || data.categoryIcon}
          </div>

          {/* Product Name */}
          <div className="min-w-0 flex-1 leading-tight">
            <h2 className="text-[16px]  font-semibold text-[#111c18]">
              {data.nameBn}
            </h2>
            <p>{`প্রতি ${unitBn[data.unit]} · ${data.categoryNameBn}`}</p>

            <p>
              {`গতকালের তুলনায় আজ দাম · ${
                data.change.dir === "up"
                  ? `বেড়েছে ${(data.today - data.yesterday).toLocaleString(
                      "bn-BD",
                    )}টাকা`
                  : data.change.dir === "down"
                    ? `কমেছে ${(data.yesterday - data.today).toLocaleString(
                        "bn-BD",
                      )}টাকা`
                    : "অপরিবর্তিত"
              }`}
            </p>
          </div>
        </div>
        <div className="bg-[#FAFCFA] p-5 rounded-3xl">
          <p>আজকের দাম</p>
          <span>{data.today.toLocaleString("bn-BD")}</span>
          <p>{`টাকা / ${unitBn[data.unit]}`}</p>

          <div
            className={`badge h-auto shrink-0 gap-1 rounded-full border-0 px-3 py-1 text-sm  ${
              data.change.dir === "up"
                ? "bg-[#f0f5f0]  text-red-500"
                : data.change.dir === "down"
                  ? "bg-[#f0f5f0] text-green-500"
                  : "bg-[#f0f5f0]"
            }`}
          >
            <span>
              {data.change.dir === "up"
                ? "▲"
                : data.change.dir === "down"
                  ? "▼"
                  : "—"}
            </span>

            <span>{Math.abs(data.change.pct).toLocaleString("bn-BD")}%</span>
          </div>
        </div>
      </div>

      <div>
        <PriceDetailsCard data={data} />
      </div>
    </div>
  );
};

export default page;
