import { getAllBookings } from "@/lib/api/user/booking";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;

  let data: any[] = [];
  let pagination: any = null;

  try {
    const result = await getAllBookings({ page, limit });
    if (result.success) {
      data = result.data;
      pagination = result.pagination;
    }
  } catch (error) {
    // API not available - show empty state
    console.log("API not available, showing empty state");
  }

  const upcomingBookings = data?.filter((b: any) => b.status === "confirmed" || b.status === "pending") || [];
  const completedBookings = data?.filter((b: any) => b.status === "completed") || [];
  const cancelledBookings = data?.filter((b: any) => b.status === "cancelled") || [];

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Dashboard
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">My Bookings</h2>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#C63A07]">
          <p className="text-sm text-gray-600">Upcoming</p>
          <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-gray-900">{completedBookings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Cancelled</p>
          <p className="text-2xl font-bold text-gray-900">{cancelledBookings.length}</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-on-dark mb-4">Upcoming Bookings</h3>
          <div className="space-y-4">
            {upcomingBookings.map((booking: any) => (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {booking.property?.imageUrl && (
                    <div className="relative w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + booking.property.imageUrl}
                        alt={booking.property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-on-dark mb-1">
                          {booking.property?.title || "Property"}
                        </h4>
                        <p className="text-sm text-muted">{booking.property?.location || ""}</p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-[1px] rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted">Check-in</p>
                        <p className="text-on-dark font-medium">{booking.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-muted">Check-out</p>
                        <p className="text-on-dark font-medium">{booking.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-muted">Guests</p>
                        <p className="text-on-dark font-medium">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-muted">Total</p>
                        <p className="text-on-dark font-bold text-[#C63A07]">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Bookings */}
      {completedBookings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-on-dark mb-4">Completed Bookings</h3>
          <div className="space-y-4">
            {completedBookings.map((booking: any) => (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6 opacity-75">
                <div className="flex flex-col md:flex-row gap-6">
                  {booking.property?.imageUrl && (
                    <div className="relative w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + booking.property.imageUrl}
                        alt={booking.property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-on-dark mb-1">
                          {booking.property?.title || "Property"}
                        </h4>
                        <p className="text-sm text-muted">{booking.property?.location || ""}</p>
                      </div>
                      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[1px] rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted">Check-in</p>
                        <p className="text-on-dark font-medium">{booking.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-muted">Check-out</p>
                        <p className="text-on-dark font-medium">{booking.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-muted">Guests</p>
                        <p className="text-on-dark font-medium">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-muted">Total</p>
                        <p className="text-on-dark font-bold text-[#C63A07]">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancelled Bookings */}
      {cancelledBookings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-on-dark mb-4">Cancelled Bookings</h3>
          <div className="space-y-4">
            {cancelledBookings.map((booking: any) => (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6 opacity-50">
                <div className="flex flex-col md:flex-row gap-6">
                  {booking.property?.imageUrl && (
                    <div className="relative w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + booking.property.imageUrl}
                        alt={booking.property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-on-dark mb-1">
                          {booking.property?.title || "Property"}
                        </h4>
                        <p className="text-sm text-muted">{booking.property?.location || ""}</p>
                      </div>
                      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[1px] rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted">Check-in</p>
                        <p className="text-on-dark font-medium">{booking.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-muted">Check-out</p>
                        <p className="text-on-dark font-medium">{booking.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-muted">Guests</p>
                        <p className="text-on-dark font-medium">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-muted">Total</p>
                        <p className="text-on-dark font-bold text-[#C63A07]">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data && data.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-muted text-lg mb-4">No bookings yet</p>
          <Link
            href="/dashboard/properties"
            className="inline-block h-12 px-6 bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg"
          >
            Browse Properties
          </Link>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => {
                const params = new URLSearchParams();
                params.set("page", String(pagination.page - 1));
                window.location.href = `/dashboard/bookings?${params.toString()}`;
              }}
              className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
            >
              Prev
            </button>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => {
                const params = new URLSearchParams();
                params.set("page", String(pagination.page + 1));
                window.location.href = `/dashboard/bookings?${params.toString()}`;
              }}
              className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
