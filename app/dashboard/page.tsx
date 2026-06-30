import { getUserData } from "@/lib/cookies";

export default async function DashboardPage() {
  const user = await getUserData();
  const name =
    user?.firstName || user?.username || user?.name || user?.email || "User";

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end mb-8">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-muted">
            Dashboard
          </p>
          <h1 className="text-4xl font-bold uppercase leading-none text-on-dark md:text-5xl">
            Welcome, {name}
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex gap-8">
          <a
            href="/dashboard"
            className="pb-4 border-b-2 border-[#C63A07] text-sm font-medium text-[#C63A07]"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/users"
            className="pb-4 border-b-2 border-transparent text-sm font-medium text-muted hover:text-on-dark"
          >
            Users
          </a>
          <a
            href="/dashboard/properties"
            className="pb-4 border-b-2 border-transparent text-sm font-medium text-muted hover:text-on-dark"
          >
            Properties
          </a>
          <a
            href="/dashboard/bookings"
            className="pb-4 border-b-2 border-transparent text-sm font-medium text-muted hover:text-on-dark"
          >
            Bookings
          </a>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <div className="p-2 bg-green-100 rounded-full">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">Rs 145,231</p>
          <p className="text-sm text-green-600 mt-2">+20.1% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">2,350</p>
          <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Properties</h3>
            <div className="p-2 bg-purple-100 rounded-full">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Bookings</h3>
            <div className="p-2 bg-orange-100 rounded-full">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">892</p>
          <p className="text-sm text-green-600 mt-2">+18.2% from last month</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #BK001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Lila Kunwar
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Mountain View Resort
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-20
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Rs 6000
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #BK002
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Hari Bahadur
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Lake Side Cottage
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-18
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-22
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Rs 8440
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #BK003
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Shraddha Kumari
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Heritage Boutique Hotel
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-20
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-25
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Rs7750
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #BK004
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Sara Khan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Jungle Safari Lodge
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-22
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-26
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    Cancelled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Rs 8880
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #BK005
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Satya Nepali
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  Peaceful Retreat
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-25
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  2024-01-30
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Rs 5550
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
