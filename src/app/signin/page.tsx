"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
// import { Github, ArrowLeft } from "lucide-react";

const SignInPage = () => {

  
const router = useRouter();

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
    console.log(data, 'from handleGoogleSignIn');
    
  };

  const handleGithubSignIn = async () => {
   
    await authClient.signIn.social({
      provider: "github",
    });
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 text-[#202a22]">
      <div className="mx-auto w-full max-w-[392px]">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">সাইন ইন</h1>

          <p className="mt-1 text-sm text-gray-500">
            বিনা খরচে সাইন ইন করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Register Form Card */}
        <div className="rounded-2xl border border-[#dfe8df] bg-[#fafcfb] p-5 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="mb-1.5 text-sm font-medium">ইমেইল</label>

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input h-[38px] min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="mb-1.5 text-sm font-medium">পাসওয়ার্ড</label>

              <input
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input h-[38px] min-h-0 w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 text-sm outline-none focus:border-green-600"
              />
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="btn min-h-0 h-[38px] w-full rounded-lg border-0 bg-[#07883f] text-sm font-semibold text-white shadow-md hover:bg-[#067735]"
            >
              সাইন ইন
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-0.5">
              <div className="h-px flex-1 bg-[#dfe5df]" />
              <span className="text-xs text-gray-500">অথবা</span>
              <div className="h-px flex-1 bg-[#dfe5df]" />
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
              onClick={handleGoogleSignIn}
                
                className="btn min-h-0 h-[38px] rounded-lg border border-[#dfe8df] bg-transparent px-2 text-xs font-semibold text-[#202a22] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
              >
                <span className="text-base font-bold text-[#4285F4]"><FcGoogle /></span>
                Google দিয়ে চালিয়ে যান
              </button>

              <button
              onClick={handleGithubSignIn}
                className="btn min-h-0 h-[38px] rounded-lg border border-[#dfe8df] bg-transparent px-2 text-xs font-semibold text-[#202a22] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
              >
                <FaGithub size={20} />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            {/* Login Link */}
            <p className="pt-0.5 text-center text-sm text-[#424b44]">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/login"
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
          className="mt-5 flex items-center justify-center gap-1.5 py-1 text-sm text-gray-500 transition-colors hover:text-[#07883f]"
        >
          {/* <ArrowLeft size={14} /> */}
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
