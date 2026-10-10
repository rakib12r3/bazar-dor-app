import Banner from "@/components/homePage/Banner";
import AllProducts from "@/components/homePage/AllProducts";
import TopFallers from "@/components/homePage/TopFallers";
import TopRisers from "@/components/homePage/TopRisers";
import Image from "next/image";
import baseURL from "@/components/baseURL/BaseUrl";

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
    dir: "up" | "down";
    pct: number;
  };
}

export default async function Home() {

  const res = await fetch(`${baseURL}/products`);
  const data: ITopRisers[] = await res.json();


  return (
    <div>
      <Banner />
      <TopRisers data={data}/>
      <TopFallers data={data}/>
      <AllProducts data={data}/>
    </div>
  );
}
