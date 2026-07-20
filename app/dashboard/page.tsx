import { getUserData } from "@/lib/cookies";
import { getAllProperties } from "@/lib/api/user/property";
import { getAllBookings } from "@/lib/api/user/booking";
import PropertyCard from "./_components/PropertyCard";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUserData();
  const name =
    user?.firstName || user?.username || user?.name || user?.email || "User";

  // Fetch recommended properties and recent bookings with error handling
  let recommendedProperties: any[] = [];
  let recentBookings: any[] = [];

  try {
    // const [propertiesResult, bookingsResult] = await Promise.all([
    //   getAllProperties({ page: 1, limit: 4 }),
    //   getAllBookings({ page: 1, limit: 3 }),
    // ]);
    // recommendedProperties = propertiesResult.success ? propertiesResult.data : [];
    // recentBookings = bookingsResult.success ? bookingsResult.data : [];
     const propertiesResult = await getAllProperties({
    page: 1,
    limit: 4,
  });
  

  console.log("Properties Result:", propertiesResult);

  recommendedProperties = propertiesResult.success
    ? propertiesResult.data
    : [];
} catch (e) {
  console.error("Properties Error:", e);
}

try {
  const bookingsResult = await getAllBookings({
    page: 1,
    limit: 3,
  });

  console.log("Bookings Result:", bookingsResult);

  recentBookings = bookingsResult.success
    ? bookingsResult.data
    : [];
} catch (e) {
  console.error("Bookings Error:", e);}
  // } catch (error) {
  //   // API not available - show empty state
  //   console.log("API not available, showing empty state");
  // }

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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          href="/dashboard/properties"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#C63A07]/10 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#C63A07]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-on-dark">Browse Properties</h3>
          </div>
        </Link>
        <Link
          href="/dashboard/bookings"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-on-dark">My Bookings</h3>
          </div>
        </Link>
        <Link
          href="/dashboard/profile"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-on-dark">Profile</h3>
          </div>
        </Link>
        <Link
          href="/dashboard/password"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-on-dark">Change Password</h3>
          </div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <Link href="/dashboard/properties" className="block">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-muted">Search properties by title or location...</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Property Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-on-dark mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Apartment", "Home", "Room", "Hostel"].map((category) => (
            <Link
              key={category}
              href={`/dashboard/properties?category=${category.toLowerCase()}`}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-on-dark">{category}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Properties */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-on-dark">Recommended Properties</h2>
          <Link
            href="/dashboard/properties"
            className="text-sm text-[#C63A07] hover:underline"
          >
            View All
          </Link>
        </div>
        {recommendedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProperties.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-muted">No properties available</p>
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-on-dark">Recent Bookings</h2>
            <Link
              href="/dashboard/bookings"
              className="text-sm text-[#C63A07] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {recentBookings.slice(0, 3).map((booking: any) => (
                <div key={booking._id} className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-on-dark">
                      {booking.property?.title || "Property"}
                    </h3>
                    <p className="text-sm text-muted">
                      {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-[1px] rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
