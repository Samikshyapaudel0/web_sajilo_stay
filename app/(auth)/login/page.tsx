// import LoginFormZod from "../_components/LoginFormZod";

// export default function LoginPage() {
//   return (
//     <div>
//       <LoginFormZod />
//     </div>
//   );
// }

import LoginFormZod from "../_components/LoginFormZod";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-white flex items-center justify-center p-8 border-r border-gray-200">
          <img
            src="\images\logo.png"
            alt="Sajilo Stay"
            className="w-full max-w-[420px] object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="bg-[#fafafa] flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <LoginFormZod />
          </div>
        </div>
      </div>
    </div>
  );
}