"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { GrUserManager } from "react-icons/gr";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি!");
        return;
      }

      setIsOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="relative min-w-0 max-w-full">
      {isPending ? (
        <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-100 sm:h-10 sm:w-28" />
      ) : user ? (
        <>
          {/* Profile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="প্রোফাইল মেনু"
            className="flex max-w-full items-center gap-1 rounded-lg p-1.5 transition-colors hover:bg-gray-100 sm:gap-2 sm:px-3 sm:py-2"
          >
            {/* Profile Picture */}
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-green-500 sm:h-9 sm:w-9 sm:rounded-[10px]">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-semibold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <span className="hidden max-w-24 truncate text-sm font-medium text-[#202a22] min-[400px]:block sm:max-w-28">
              {user.name}
            </span>

            <span className="shrink-0 text-[10px] text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(270px,calc(100vw-24px))] rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-3 shadow-lg sm:p-4">
              {/* User Information */}
              <div className="border-b border-[#e5ebe5] px-1 pb-3">
                <h3 className="truncate text-sm font-semibold text-[#202a22]">
                  {user.name}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              {/* Profile Link */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-[#202a22] transition-colors hover:bg-[#edf4ed]"
              >
                <GrUserManager />
                <span>আমার প্রোফাইল</span>
              </Link>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                <span>↪</span>
                <span>সাইন আউট</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Login না করা থাকলে */
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/signin"
            className="whitespace-nowrap rounded-lg px-2 py-2 text-xs transition-colors hover:bg-gray-100 sm:px-4 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="whitespace-nowrap rounded-lg bg-[#05893E] px-2.5 py-2 text-xs text-white transition-colors hover:bg-[#047332] sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
