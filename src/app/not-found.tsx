import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[80vh] sm:px-6">
      <h1 className="text-7xl font-extrabold text-[#05893E] sm:text-8xl md:text-9xl">
        404
      </h1>

      <h2 className="mt-3 text-xl font-bold sm:mt-4 sm:text-2xl md:text-3xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে
        অথবা লিংকটি ভুল।
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#05893E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:px-6 sm:text-base"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
