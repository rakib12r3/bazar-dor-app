import baseURL from "@/components/baseURL/BaseUrl";
import PriceDetailsCard from "@/components/PriceCard";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
  };

  const listRes = await fetch(`${baseURL}/products`);

  if (!listRes.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: IDetailsPage[] = await listRes.json();

  const matchedProduct = products.find((product) => product.slug === slug);

  if (!matchedProduct) {
    notFound();
  }

  const res = await fetch(`${baseURL}/products/${matchedProduct.id}`);

  if (!res.ok) {
    notFound();
  }

  const data: IDetailsPage = await res.json();

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <div className="my-5 flex gap-2">
        <Link href="/" className="hover:underline">
          হোম
        </Link>

        <span>›</span>

        <Link href={`/category/${data.category}`} className="hover:underline">
          {data.categoryNameBn}
        </Link>

        <span>›</span>

        <p>{data.nameBn}</p>
      </div>

      <div className="flex flex-col justify-between gap-5 rounded-3xl bg-white px-5 py-3 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[15px] bg-[#f0f5f0] text-[30px]">
            {data.image || data.categoryIcon}
          </div>

          <div className="min-w-0 flex-1 leading-tight">
            <h2 className="text-3xl font-bold text-[#111c18]">{data.nameBn}</h2>

            <p className="text-sm text-gray-500">
              {`প্রতি ${unitBn[data.unit] ?? data.unit} · ${data.categoryNameBn}`}
            </p>

            <p className="mt-2 text-sm">
              {`গতকালের তুলনায় আজ দাম · ${
                data.change.dir === "up"
                  ? `বেড়েছে ${(data.today - data.yesterday).toLocaleString(
                      "bn-BD",
                    )} টাকা`
                  : data.change.dir === "down"
                    ? `কমেছে ${(data.yesterday - data.today).toLocaleString(
                        "bn-BD",
                      )} টাকা`
                    : "অপরিবর্তিত"
              }`}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-[#FAFCFA] p-5">
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <p className="text-center text-3xl font-bold">
            {data.today.toLocaleString("bn-BD")}
          </p>

          <p className="text-center text-sm text-gray-500">
            {`টাকা / ${unitBn[data.unit] ?? data.unit}`}
          </p>

          <div
            className={`badge mt-2 shrink-0 gap-1 rounded-full border-0 px-3 py-1 text-sm ${
              data.change.dir === "up"
                ? "bg-[#f0f5f0] text-red-500"
                : data.change.dir === "down"
                  ? "bg-[#f0f5f0] text-green-500"
                  : "bg-[#f0f5f0] text-gray-500"
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

      <div className="mt-6">
        <PriceDetailsCard data={data} />
      </div>
    </div>
  );
};

export default Page;
