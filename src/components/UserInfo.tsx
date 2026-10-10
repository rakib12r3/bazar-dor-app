
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {user ? (
        <>
          {/* Profile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          >
            {/* Profile Picture */}
            <div className=" w-9 shrink-0 px-6 overflow-hidden rounded-2xl bg-green-500">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex  w-full items-center justify-center font-semibold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <span className="max-w-28 truncate text-sm font-medium text-[#202a22]">
              {user.name}
            </span>

            <span className="text-[10px] text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[270px] rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-4 shadow-lg">
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
                <span>👤</span>
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
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-[10px] px-4 py-2 transition-colors hover:bg-gray-200"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-[10px] bg-[#05893E] px-4 py-2 text-white transition-colors hover:bg-[#047332]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
