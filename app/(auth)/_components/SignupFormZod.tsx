"use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

// import { RegisterFormData, registerSchema } from "./schema";

// export default function RegisterFormZod() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       fullname: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = (data: RegisterFormData) => {
//     alert(`Submitted data: ${data.fullname}, ${data.email}, ${data.password}`);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {/* Full Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Full Name*
//         </label>

//         <div className="relative">
//           <User
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Enter your full name"
//             {...register("fullname")}
//             className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
//           />
//         </div>

//         {errors.fullname && (
//           <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Email Address*
//         </label>

//         <div className="relative">
//           <Mail
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="email"
//             placeholder="Enter your email address"
//             {...register("email")}
//             className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
//           />
//         </div>

//         {errors.email && (
//           <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       {/* Password */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Password*
//         </label>

//         <div className="relative">
//           <Lock
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Create your strong password"
//             {...register("password")}
//             className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {errors.password && (
//           <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
//         )}
//       </div>

//       {/* Confirm Password */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Confirm Password*
//         </label>

//         <div className="relative">
//           <Lock
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Confirm your password"
//             {...register("confirmPassword")}
//             className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
//           />

//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//           >
//             {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {errors.confirmPassword && (
//           <p className="text-red-500 text-xs mt-1">
//             {errors.confirmPassword.message}
//           </p>
//         )}
//       </div>

//       {/* Terms */}
//       <div className="flex items-start gap-2 pt-2">
//         <input
//           type="checkbox"
//           className="mt-1 h-4 w-4 rounded border-gray-300"
//         />

//         <p className="text-xs text-gray-600 leading-relaxed">
//           I agree to the{" "}
//           <span className="text-[#C5410F] hover:underline cursor-pointer">
//             Terms of Service
//           </span>{" "}
//           and{" "}
//           <span className="text-[#C5410F] hover:underline cursor-pointer">
//             Privacy Policy
//           </span>
//         </p>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full h-12 bg-[#C5410F] hover:bg-[#b13b0d] text-white font-semibold rounded-lg transition duration-200 shadow-sm mt-2"
//       >
//         {isSubmitting ? "Creating Account..." : "Create Account"}
//       </button>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";

import { RegisterFormData, registerSchema } from "./schema";

export default function RegisterFormZod() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      gender: "male",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    alert("Registration form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name*
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
            />
          </div>

          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name*
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
            />
          </div>

          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username*
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Enter username"
            {...register("username")}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
          />
        </div>

        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address*
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
          />
        </div>

        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number*
        </label>

        <div className="relative">
          <Phone
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="tel"
            placeholder="98XXXXXXXX"
            {...register("phoneNumber")}
            className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
          />
        </div>

        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender*
        </label>

        <select
          {...register("gender")}
          className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {errors.gender && (
          <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password*
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create your password"
            {...register("password")}
            className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password*
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5410F]/20 focus:border-[#C5410F]"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-300"
        />

        <p className="text-xs text-gray-600 leading-relaxed">
          I agree to the{" "}
          <span className="text-[#C5410F] cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-[#C5410F] cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#C5410F] hover:bg-[#b13b0d] text-white font-semibold rounded-lg transition duration-200 shadow-sm mt-2 disabled:opacity-50"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}