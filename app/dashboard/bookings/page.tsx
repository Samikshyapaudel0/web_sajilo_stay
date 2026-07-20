import { getAllBookings } from "@/lib/api/user/booking";
import Link from "next/link";
import BookingCard from "../_components/BookingCard";
import BookingsPagination from "../_components/BookingsPagination";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;

  let data: any[] = [];
  let meta: any = null;

  try {
    const result = await getAllBookings({ page, limit });
    if (result.success) {
      data = result.data;
      meta = result.meta;
    }
  } catch (error) {
    console.log("API not available, showing empty state");
  }

  const upcomingBookings =
    data?.filter(
      (b: any) => b.status === "confirmed" || b.status === "pending",
    ) || [];
  const completedBookings =
    data?.filter((b: any) => b.status === "completed") || [];
  const cancelledBookings =
    data?.filter(
      (b: any) => b.status === "cancelled" || b.status === "rejected",
    ) || [];

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Dashboard
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">My Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#C63A07]">
          <p className="text-sm text-gray-600">Upcoming</p>
          <p className="text-2xl font-bold text-gray-900">
            {upcomingBookings.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-gray-900">
            {completedBookings.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Cancelled</p>
          <p className="text-2xl font-bold text-gray-900">
            {cancelledBookings.length}
          </p>
        </div>
      </div>

      {upcomingBookings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-on-dark mb-4">
            Upcoming Bookings
          </h3>
          <div className="space-y-4">
            {upcomingBookings.map((booking: any) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                showCancel
              />
            ))}
          </div>
        </div>
      )}

      {completedBookings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-on-dark mb-4">
            Completed Bookings
          </h3>
          <div className="space-y-4">
            {completedBookings.map((booking: any) => (
              <BookingCard key={booking._id} booking={booking} faded />
            ))}
          </div>
        </div>
      )}

      {cancelledBookings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-on-dark mb-4">
            Cancelled Bookings
          </h3>
          <div className="space-y-4">
            {cancelledBookings.map((booking: any) => (
              <BookingCard key={booking._id} booking={booking} faded />
            ))}
          </div>
        </div>
      )}

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

      {meta && totalPages > 1 && (
        <BookingsPagination page={meta.page} totalPages={totalPages} />
      )}
    </section>
  );
}
