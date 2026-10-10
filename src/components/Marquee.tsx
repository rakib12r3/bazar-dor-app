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
    <MarqueeText 
    
      direction="right"
      duration={10}
      pauseOnHover={true}
      
    >
      {data.map((p) => (
        <div className="flex items-center ml-7xl  py-1 px-9 border-r border-gray-100" key={p.id}>
      
            
          <p>{p.image}</p>
          <p>{p.nameBn}</p>
          <p>{`${Number(p.today).toLocaleString("bn-BD")}টাকা/${unitBn[p.unit] || p.unit} `}</p>
          <p
            className={`${p.change.dir === "up" ? "text-red-500" : "text-green-500"}`}
            >{`${p.change.dir === "up" ? "▲" : "▼"} ${Math.abs(p.change.pct).toLocaleString("bn-BD")}%`}</p>
         
        </div>
      ))}
    </MarqueeText>
  );
};

export default Marquee;
