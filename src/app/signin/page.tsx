"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
// import { Github, ArrowLeft } from "lucide-react";

const SignInPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams.get("message") === "login-required") {
      toast.error("এই পেজটি দেখতে আগে লগইন করুন!", {
        id: "login-required",
      });
    }
  }, [searchParams]);

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        // console.error(error);
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      // console.error(error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    console.log(data, "from handleGoogleSignIn");
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-3 py-6 text-[#202a22] sm:px-5 sm:py-10">
      <div className="mx-auto w-full max-w-[392px]">
        {/* Header */}
        <div className="mb-5 text-center sm:mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-gray-500 sm:text-base">
            বিনা খরচে সাইন ইন করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Sign In Form Card */}
        <div className="rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-4 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label
                htmlFor="email"
                className="mb-1.5 text-sm font-medium sm:text-base"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="input h-11 min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600 sm:h-12 sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label
                htmlFor="password"
                className="mb-1.5 text-sm font-medium sm:text-base"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
                required
                className="input h-11 min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600 sm:h-12 sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn h-11 min-h-0 w-full rounded-lg border-0 bg-[#07883f] text-sm font-semibold text-white shadow-md hover:bg-[#067735] sm:h-12 sm:text-base"
            >
              সাইন ইন
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-0.5">
              <div className="h-px flex-1 bg-[#dfe5df]" />
              <span className="shrink-0 text-xs text-gray-500 sm:text-sm">
                অথবা
              </span>
              <div className="h-px flex-1 bg-[#dfe5df]" />
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn h-11 min-h-0 w-full gap-2 rounded-lg border border-[#dfe8df] bg-transparent px-2 text-sm font-semibold text-[#202a22] shadow-none hover:bg-[#f0f5f0] sm:h-12 sm:text-xs md:text-sm"
              >
                <FcGoogle size={20} />
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                onClick={handleGithubSignIn}
                className="btn h-11 min-h-0 w-full gap-2 rounded-lg border border-[#dfe8df] bg-transparent px-2 text-sm font-semibold text-[#202a22] shadow-none hover:bg-[#f0f5f0] sm:h-12 sm:text-xs md:text-sm"
              >
                <FaGithub size={20} />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="pt-1 text-center text-sm leading-relaxed text-[#424b44]">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#07883f] hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </form>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-4 flex items-center justify-center gap-2 py-2 text-sm text-gray-500 transition-colors hover:text-[#07883f] sm:mt-5"
        >
          হোম পেজে ফিরে যান
          <FaArrowRightFromBracket />
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
