
import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-5 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex gap-2 my-5">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-4 w-3 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-4 w-3 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200" />
      </div>

      {/* Product Information Skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-5 bg-white px-5 py-5 rounded-3xl">
        <div className="flex items-center gap-5">
          <div className="h-[70px] w-[70px] shrink-0 rounded-[15px] bg-gray-200" />

          <div className="flex-1 space-y-3">
            <div className="h-7 w-40 max-w-full rounded bg-gray-200" />
            <div className="h-4 w-32 max-w-full rounded bg-gray-200" />
            <div className="h-4 w-52 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Today's Price Skeleton */}
        <div className="w-full sm:w-48 rounded-3xl bg-[#FAFCFA] p-5 space-y-3">
          <div className="mx-auto h-4 w-20 rounded bg-gray-200" />
          <div className="mx-auto h-9 w-28 rounded bg-gray-200" />
          <div className="mx-auto h-4 w-24 rounded bg-gray-200" />
          <div className="mx-auto h-6 w-16 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#dfe8df] p-4 space-y-3"
          >
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-8 w-32 rounded bg-gray-200" />
            <div className="h-3 w-36 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Market Table Skeleton */}
      <div className="mt-6">
        <div className="mb-4 h-6 w-48 rounded bg-gray-200" />

        <div className="overflow-hidden rounded-2xl border border-[#dfe8df]">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b p-4">
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
              className="grid grid-cols-5 gap-4 border-b border-[#dfe8df] p-4 last:border-b-0"
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
  );
};

export default ProductDetailsSkeleton;
