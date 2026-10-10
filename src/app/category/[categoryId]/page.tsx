import baseURL from "@/components/baseURL/BaseUrl";
import CategoryProducts from "@/components/CategoryProduct";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface ICategoryPage{
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



const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = await params;
  console.log(categoryId);

  const respons = await fetch(
    `${baseURL}/categories/${categoryId}`,
  );

  if (!respons.ok) {
  notFound();
}
  const categoryData = await respons.json();
  console.log(categoryData, "from single category");

  const res = await fetch(
    `${baseURL}/products?category=${categoryId}`,
  );
  const data:ICategoryPage[] = await res.json();
  console.log(data,'from category=');
  







  return (
    <div className="w-full max-w-6xl mx-auto px-5">
     
      <div className="flex  my-7 bg-white items-center p-5 gap-3 rounded-2xl">
        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#f0f5f0] text-[30px]">
          {categoryData.image || categoryData.icon}
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <h2 className="text-[16px]  font-semibold text-[#111c18]">
            {categoryData.nameBn}
          </h2>

          <p className="mt-1 text-[15px] text-[#66756d]">
            {`${data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </div>

      <CategoryProducts products={data}/>
    </div>
  );
};

export default CategoryPage;
