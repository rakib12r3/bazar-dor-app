import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-3 sm:px-5">
      {/* Breadcrumb Skeleton */}
      <div className="my-4 flex flex-wrap items-center gap-2 sm:my-5">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-4 w-3 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200 sm:w-24" />
        <div className="h-4 w-3 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200 sm:w-20" />
      </div>

      {/* Product Information Skeleton */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 sm:gap-5 sm:rounded-3xl sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200 sm:h-[70px] sm:w-[70px] sm:rounded-[15px]" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-6 w-36 max-w-full rounded bg-gray-200 sm:h-7 sm:w-40" />
            <div className="h-4 w-28 max-w-full rounded bg-gray-200 sm:w-32" />
            <div className="h-4 w-40 max-w-full rounded bg-gray-200 sm:w-52" />
          </div>
        </div>

        {/* Today's Price Skeleton */}
        <div className="w-full space-y-3 rounded-2xl bg-[#FAFCFA] p-4 sm:rounded-3xl sm:p-5 lg:w-48 lg:shrink-0">
          <div className="mx-auto h-4 w-20 rounded bg-gray-200" />
          <div className="mx-auto h-8 w-28 rounded bg-gray-200 sm:h-9" />
          <div className="mx-auto h-4 w-24 rounded bg-gray-200" />
          <div className="mx-auto h-6 w-16 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-2xl border border-[#dfe8df] p-4 sm:p-5"
          >
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-8 w-32 max-w-full rounded bg-gray-200" />
            <div className="h-3 w-36 max-w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Market Table Skeleton */}
      <div className="mt-5 sm:mt-6">
        <div className="mb-4 h-6 w-40 max-w-full rounded bg-gray-200 sm:w-48" />

        <div className="overflow-hidden rounded-2xl border border-[#dfe8df]">
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-3 border-b border-[#dfe8df] p-3 sm:gap-4 sm:p-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 rounded bg-gray-200"
                  />
                ))}
              </div>

              {/* Table Rows */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-3 border-b border-[#dfe8df] p-3 last:border-b-0 sm:gap-4 sm:p-4"
                >
                  {Array.from({ length: 5 }).map((_, cellIndex) => (
                    <div
                      key={cellIndex}
                      className="h-4 rounded bg-gray-200"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
