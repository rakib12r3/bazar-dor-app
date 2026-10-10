import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 text-center">
      <h1 className="text-8xl font-extrabold text-[#05893E]">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        দুঃখিত! তুমি যে পেজটি খুঁজছ, সেটি হয়তো সরানো হয়েছে
        অথবা লিংকটি ভুল।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যাও
      </Link>
    </div>
  );
}