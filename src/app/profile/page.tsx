"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  // Sign out functionality
  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.replace("/signin");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Update name functionality
  const handleUpdateName = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (trimmedName === user?.name) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        console.error(error);
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch (error) {
      console.error(error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  // Session loading
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
        <span className="loading loading-spinner loading-lg text-[#07883f]" />
      </main>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-3 py-6 sm:px-5">
        <div className="w-full max-w-md rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-5 text-center sm:p-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            আপনি সাইন ইন করেননি
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">
            প্রোফাইল দেখতে প্রথমে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>

          <Link
            href="/signin"
            className="btn mt-5 min-h-11 w-full border-0 bg-[#07883f] text-white hover:bg-[#067735] sm:w-auto"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 text-[#202a22] sm:px-5 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Page Header */}
        <header className="mb-5 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base md:text-lg">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* User Information Card */}
        <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-4 sm:mb-9 sm:gap-5 sm:rounded-3xl sm:p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            {/* Profile Picture */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#07883f] sm:h-16 sm:w-16">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-white sm:text-2xl">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="min-w-0 flex-1">
              <h2 className="break-words text-lg font-semibold sm:text-xl md:text-2xl">
                {user.name}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500 sm:text-base md:text-lg">
                {user.email}
              </p>
            </div>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="btn h-11 min-h-0 w-full shrink-0 rounded-xl border border-red-500 bg-transparent px-4 text-sm font-semibold text-red-500 shadow-none hover:border-red-600 hover:bg-red-50 disabled:opacity-60 sm:h-12 sm:text-base md:w-auto"
          >
            {isSigningOut ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="text-lg">↪</span>
            )}

            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </section>

        {/* Update Name Card */}
        <section className="rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-4 sm:rounded-3xl sm:p-6 md:p-7">
          <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
            তথ্য
          </h2>

          <form onSubmit={handleUpdateName}>
            <div className="form-control w-full">
              <label
                htmlFor="name"
                className="mb-2 text-base font-medium sm:text-lg"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                maxLength={100}
                required
                disabled={isSaving}
                className="input h-12 min-h-0 w-full rounded-xl border border-[#cfd7cf] bg-transparent px-3 text-base text-[#202a22] outline-none focus:border-[#07883f] focus:outline-none sm:h-[60px] sm:px-4 sm:text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving || !name.trim()}
              className="btn mt-4 h-12 min-h-0 w-full rounded-xl border-0 bg-[#07883f] px-5 text-base font-semibold text-white shadow-md hover:bg-[#067735] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[60px] sm:w-auto sm:px-6 sm:text-lg"
            >
              {isSaving ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  আপডেট হচ্ছে...
                </>
              ) : (
                "আপডেট করুন"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
