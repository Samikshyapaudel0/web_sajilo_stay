import { getPropertyById } from "@/lib/api/user/property";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPropertyById(id);

  if (!result.success) {
    throw new Error("Failed to load property");
  }

  const property = result.data;

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <Link
        href={`/dashboard/properties/${id}`}
        className="inline-block mb-6 text-sm text-muted hover:text-[#C63A07]"
      >
        ← Back to Property
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Summary */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="relative h-48 bg-gray-200">
            {property.imageUrl ? (
              <Image
                src={process.env.NEXT_PUBLIC_API_BASE_URL + property.imageUrl}
                alt={property.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-on-dark mb-2">{property.title}</h2>
            <p className="text-sm text-muted mb-4">{property.location}</p>
            <p className="text-2xl font-bold text-[#C63A07]">
              ${property.pricePerNight}/night
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-on-dark mb-6">Request Booking</h2>
          
          <form action="/api/bookings/create" method="POST" className="space-y-6">
            <input type="hidden" name="propertyId" value={property._id} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  required
                  className="h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  required
                  className="h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                required
                defaultValue="1"
                className="h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                rows={4}
                placeholder="Any special requirements..."
                className="w-full border border-hairline bg-surface-card px-4 py-3 text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg"
            >
              Submit Booking Request
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-muted">
              <strong>Note:</strong> This is a booking request. The host will review and confirm your booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
