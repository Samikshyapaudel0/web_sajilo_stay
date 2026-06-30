import Link from "next/link";

const CARDS = [
  {
    href: "/admin/users",
    label: "Users",
    desc: "Manage accounts, roles and access.",
    icon: "👥",
    count: "2,350",
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    desc: "Create, edit and publish posts.",
    icon: "📝",
    count: "156",
  },
];

export default function Page() {
  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Admin
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">Overview</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#C63A07]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">2,350</p>
          <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Blogs</h3>
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">892</p>
          <p className="text-sm text-green-600 mt-2">+18.2% from last month</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map(({ href, label, desc, icon, count }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-lg border border-hairline bg-surface-card p-6 transition-colors hover:border-[#C63A07] hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{icon}</span>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-on-dark">{label}</h3>
                  <p className="text-sm text-muted">{desc}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#C63A07]">{count}</span>
            </div>
            <span className="mt-4 inline-block text-xs font-medium tracking-[0.5px] text-body-strong opacity-0 transition-opacity group-hover:opacity-100">
              Manage →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// import Link from "next/link";

// const CARDS = [
//   {
//     href: "/admin/users",
//     label: "Users",
//     desc: "Manage accounts, roles and access.",
//   },
//   {
//     href: "/admin/blogs",
//     label: "Blogs",
//     desc: "Create, edit and publish posts.",
//   },
// ];

// export default function Page() {
//   return (
//     <section className="mx-auto w-full max-w-[1100px]">
//       <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
//         Admin
//       </p>
//       <h2 className="mb-8 text-3xl font-bold text-on-dark">Overview</h2>

//       <div className="grid gap-4 sm:grid-cols-2">
//         {CARDS.map(({ href, label, desc }) => (
//           <Link
//             key={href}
//             href={href}
//             className="group rounded-lg border border-hairline bg-surface-card p-6 transition-colors hover:border-muted"
//           >
//             <h3 className="mb-1 text-lg font-bold text-on-dark">{label}</h3>
//             <p className="text-sm text-muted">{desc}</p>
//             <span className="mt-4 inline-block text-xs font-medium tracking-[0.5px] text-body-strong opacity-0 transition-opacity group-hover:opacity-100">
//               Manage →
//             </span>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }
