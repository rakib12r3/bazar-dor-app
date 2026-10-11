import React from "react";
import MarqueeText from "react-marquee-text";
import baseURL from "./baseURL/BaseUrl";

interface IMarquee {
  id: number;
  image: string;
  nameBn: string;
  unit: string;
  today: string;
  change: {
    dir: string;
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(`${baseURL}/products`);
  const data: IMarquee[] = await res.json();
  console.log(data, "from marquee");

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
  };

  return (
    <div className="w-full overflow-hidden">
      <MarqueeText
        direction="right"
        duration={10}
        pauseOnHover={true}
      >
        {data.map((p) => (
          <div
            className="ml-4 flex shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-gray-100 px-3 py-2 sm:ml-6 sm:gap-2 sm:px-5 sm:py-1 md:ml-8 md:px-8"
            key={p.id}
          >
            <p className="text-sm sm:text-base">{p.image}</p>

            <p className="text-xs sm:text-sm md:text-base">
              {p.nameBn}
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              {`${Number(p.today).toLocaleString("bn-BD")}টাকা/${unitBn[p.unit] || p.unit}`}
            </p>

            <p
              className={`text-xs sm:text-sm ${
                p.change.dir === "up"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {`${p.change.dir === "up" ? "▲" : "▼"} ${Math.abs(p.change.pct).toLocaleString("bn-BD")}%`}
            </p>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
