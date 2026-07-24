
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LoginFormData, loginSchema } from "./schema";
import { handleLoginUser } from "@/lib/actions/auth_action";

export default function LoginFormZod() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
  console.log("FORM DATA:", data);

  setError("");

  startTransition(async () => {
    try {
      const result = await handleLoginUser(data);

      console.log("LOGIN RESULT:", result);

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);
      setError(error?.message || "Login failed");
    }
  });
};

  // const onSubmit = (data: LoginFormData) => {
  //   setError("");

  //   startTransition(async () => {
  //     try {
  //       const result = await handleLoginUser(data);

  //       if (result.success) {
  //         router.push("/dashboard");
  //       } else {
  //         setError(result.message || "Login failed");
  //       }
  //     } catch (error: any) {
  //       setError(error?.message || "Login failed");
  //     }
  //   });
  // };


  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg">{error}</div>
      )}

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-black">Welcome back!</h1>

        <p className="text-gray-700 mt-2">
          Enter your details to manage your stays
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-black mb-2">Email Address*</label>

        <input
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-4
            py-3
            bg-white
            text-black
            placeholder:text-gray-400
            outline-none
            focus:ring-1
            focus:ring-orange-500
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-black mb-2">Password*</label>

        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-4
            py-3
            bg-white
            text-black
            placeholder:text-gray-400
            outline-none
            focus:ring-1
            focus:ring-orange-500
          "
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" />
          Remember me
        </label>

        {/* <button type="button" className="text-[#C63A07] hover:underline">
          Forgot password?
        </button> */}
        <Link
          href="/forget-password"
          className="text-[#C63A07] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || isPending}
        className="
          w-full
          bg-[#C63A07]
          text-white
          py-3
          rounded-full
          font-semibold
          hover:opacity-90
          transition
          disabled:opacity-50
        "
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>

      {/* Register Link */}
      <div className="text-center pt-2">
        <span className="text-black">Don't have an account?</span>{" "}
        <Link
          href="/signup"
          className="text-[#C63A07] font-medium hover:underline"
        >
          Sign up here
        </Link>
      </div>
    </form>
  );
}

