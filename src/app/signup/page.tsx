"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সবগুলো ঘর পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/signin",
    });

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
      console.error(error);
      return;
    }

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন!");
      router.replace("/signin");
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
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-gray-500 sm:text-base">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Register Form Card */}
        <div className="rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-4 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
            {/* Name */}
            <div className="form-control">
              <label
                htmlFor="name"
                className="mb-1.5 text-sm font-medium sm:text-base"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                autoComplete="name"
                required
                className="input h-11 min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600 sm:h-12 sm:text-base"
              />
            </div>

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
                autoComplete="new-password"
                required
                className="input h-11 min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600 sm:h-12 sm:text-base"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 text-sm font-medium sm:text-base"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                autoComplete="new-password"
                required
                className="input h-11 min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600 sm:h-12 sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn h-11 min-h-0 w-full rounded-lg border-0 bg-[#07883f] text-sm font-semibold text-white shadow-md hover:bg-[#067735] sm:h-12 sm:text-base"
            >
              অ্যাকাউন্ট তৈরি করুন
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
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn h-11 min-h-0 w-full gap-2 rounded-lg border border-[#dfe8df] bg-transparent px-2 text-sm font-semibold text-[#202a22] shadow-none hover:bg-[#f0f5f0] sm:h-12 sm:text-xs md:text-sm"
              >
                <FcGoogle size={20} />
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                onClick={handleGithubSignIn}
                type="button"
                className="btn h-11 min-h-0 w-full gap-2 rounded-lg border border-[#dfe8df] bg-transparent px-2 text-sm font-semibold text-[#202a22] shadow-none hover:bg-[#f0f5f0] sm:h-12 sm:text-xs md:text-sm"
              >
                <FaGithub size={20} />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            {/* Login Link */}
            <p className="pt-1 text-center text-sm leading-relaxed text-[#424b44]">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-medium text-[#07883f] hover:underline"
              >
                সাইন ইন করুন
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

export default SignUpPage;
