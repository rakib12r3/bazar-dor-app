import baseURL from "@/components/baseURL/BaseUrl";
import CategoryProducts from "@/components/CategoryProduct";
import { notFound } from "next/navigation";

interface ICategoryPage {
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

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  console.log(categoryId);

  const respons = await fetch(`${baseURL}/categories/${categoryId}`);

  if (!respons.ok) {
    notFound();
  }

  const categoryData = await respons.json();
  console.log(categoryData, "from single category");

  const res = await fetch(`${baseURL}/products?category=${categoryId}`);

  const data: ICategoryPage[] = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
      <div className="my-4 flex items-center gap-3 rounded-2xl bg-white p-3 sm:my-6 sm:gap-4 sm:p-5 md:my-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl sm:h-12 sm:w-12 sm:rounded-[15px] sm:text-[28px] md:h-[50px] md:w-[50px] md:text-[30px]">
          {categoryData.image || categoryData.icon}
        </div>

        <div className="min-w-0 flex-1 leading-tight">
          <h2 className="break-words text-sm font-semibold text-[#111c18] sm:text-base">
            {categoryData.nameBn}
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-[#66756d] sm:text-sm md:text-[15px]">
            {`${data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </div>

      <CategoryProducts products={data} />
    </div>
  );
};

export default CategoryPage;
