// import Link from "next/link";
// import RegisterFormZod from "../_components/SignupFormZod";

// export default function SignupPage() {
//   return (
//     <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-[24px] border border-gray-200 shadow-lg px-8 py-8">
//           {/* Logo */}
//           <div className="flex flex-col items-center">
//             <img
//               src="/images/logo.png"
//               alt="Sajilo Stay"
//               className="h-16 w-auto"
//             />

//             <h1 className="mt-4 text-2xl font-bold text-gray-900">
//               Create Your Account
//             </h1>

//             <p className="mt-2 text-center text-gray-600 text-sm leading-relaxed max-w-xs">
//               Join thousands of students and workers finding their ideal homes.
//             </p>
//           </div>

//           {/* Form */}
//           <div className="mt-8">
//             <RegisterFormZod />
//           </div>

//           {/* Sign In */}
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-[#C5410F] font-semibold hover:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import RegisterFormZod from "../_components/SignupFormZod";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-[24px] border border-gray-200 shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side Logo */}
          <div className="flex items-center justify-center p-10 border-r border-gray-200">
            <img
              src="\images\logo.png"
              alt="Sajilo Stay"
              className="w-full max-w-[420px] object-contain"
            />
          </div>

          {/* Right Side Form */}
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black">Create Account</h1>

              <p className="text-gray-600 mt-2">
                Create your Sajilo Stay account
              </p>
            </div>

            <RegisterFormZod />
          </div>
        </div>
      </div>
    </div>
  );
}