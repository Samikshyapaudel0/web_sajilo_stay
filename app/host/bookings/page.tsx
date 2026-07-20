import { getAllBookings } from "@/lib/api/host/booking";
import BookingTable from "./_components/BookingTable";

export default async function Page() {
  const result = await getAllBookings();

  if (!result.success) {
    throw new Error("Failed to load bookings");
  }

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Host
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">Bookings</h2>
      <BookingTable data={result.data} />
    </section>
  );
}
