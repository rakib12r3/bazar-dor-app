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

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
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

  const matchedProduct = products.find(
    (product) => product.slug === slug,
  );

  if (!matchedProduct) {
    notFound();
  }

  const res = await fetch(
    `${baseURL}/products/${matchedProduct.id}`,
  );

  if (!res.ok) {
    notFound();
  }

  const data: IDetailsPage = await res.json();

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
      <div className="my-4 flex flex-wrap items-center gap-2 text-sm text-gray-600 sm:my-5 sm:text-base">
        <Link href="/" className="shrink-0 hover:underline">
          হোম
        </Link>

        <span>›</span>

        <Link
          href={`/category/${data.category}`}
          className="shrink-0 hover:underline"
        >
          {data.categoryNameBn}
        </Link>

        <span>›</span>

        <p className="min-w-0 break-words font-medium text-gray-900">
          {data.nameBn}
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-3 sm:gap-5 sm:rounded-3xl sm:p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:h-[70px] sm:w-[70px] sm:rounded-[15px] sm:text-[30px]">
            {data.image || data.categoryIcon}
          </div>

          <div className="min-w-0 flex-1 leading-tight">
            <h2 className="break-words text-xl font-bold text-[#111c18] sm:text-2xl md:text-3xl">
              {data.nameBn}
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {`প্রতি ${unitBn[data.unit] ?? data.unit} · ${data.categoryNameBn}`}
            </p>

            <p className="mt-2 text-xs leading-relaxed sm:text-sm">
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

        <div className="w-full rounded-2xl bg-[#FAFCFA] p-4 sm:rounded-3xl sm:p-5 md:w-auto md:min-w-48">
          <p className="text-center text-sm text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-center text-2xl font-bold sm:text-3xl">
            {data.today.toLocaleString("bn-BD")}
          </p>

          <p className="text-center text-xs text-gray-500 sm:text-sm">
            {`টাকা / ${unitBn[data.unit] ?? data.unit}`}
          </p>

          <div
            className={`badge mt-3 flex w-fit max-w-full mx-auto shrink-0 gap-1 rounded-full border-0 px-3 py-1 text-xs sm:text-sm ${
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

            <span>
              {Math.abs(data.change.pct).toLocaleString("bn-BD")}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-8 sm:mt-6 sm:mb-10">
        <PriceDetailsCard data={data} />
      </div>
    </div>
  );
};

export default Page;
