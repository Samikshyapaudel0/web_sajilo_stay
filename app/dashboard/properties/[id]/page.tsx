import { getPropertyById } from "@/lib/api/user/property";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let property: any = null;

  try {
    const result = await getPropertyById(id);
    if (result.success) {
      property = result.data;
    }
  } catch (error) {
    console.log("API not available");
  }

  if (!property) {
    return (
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16">
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <p className="text-muted text-lg mb-6">Property not found</p>
          <Link
            href="/dashboard/properties"
            className="inline-block h-10 px-6 flex items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded"
          >
            Back to Properties
          </Link>
        </div>
      </section>
    );
  }

  const isAvailable = property.status === "available";

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Top Section */}
          <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
            <div className="relative h-80 bg-gray-200">
              {property.images && property.images.length > 0 ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${property.images[0]}`}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-xl">No Image</span>
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[1px] bg-gray-200 text-gray-700">
                  {property.category}
                </span>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[1px] ${
                    isAvailable
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {property.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-on-dark mb-2">
                {property.title}
              </h1>
              <p className="text-sm text-muted mb-4">{property.location}</p>
              <p className="text-2xl font-bold text-[#C63A07]">
                Rs {property.pricePerNight}/night
              </p>
            </div>
          </div>

          {/* Property Description */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-on-dark mb-3">Property Description</h2>
            <p className="text-body leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities && (
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-on-dark mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(property.amenities) ? property.amenities : typeof property.amenities === 'string' ? property.amenities.split(',') : []).map((amenity: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm text-body rounded-full"
                  >
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {typeof amenity === 'string' ? amenity.trim() : amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Property Information */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-on-dark mb-3">Property Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Category</span>
                <span className="text-sm text-body font-medium">{property.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Location</span>
                <span className="text-sm text-body font-medium">{property.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Price per Night</span>
                <span className="text-sm text-body font-medium">Rs {property.pricePerNight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Status</span>
                <span className="text-sm font-medium uppercase">{property.status}</span>
              </div>
            </div>
          </div>

          {/* Host Information */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-on-dark mb-3">Host Information</h2>
            <p className="text-body">
              {property.host?.name || "Host"}
            </p>
          </div>
        </div>

        {/* Sidebar - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-6 sticky top-8">
            <div className="mb-4">
              <p className="text-sm text-muted mb-1">Price per night</p>
              <p className="text-3xl font-bold text-[#C63A07]">
                Rs {property.pricePerNight}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted mb-1">Status</p>
              <p className="text-sm font-medium uppercase">{property.status}</p>
            </div>
            <Link
              href={`/dashboard/properties/${id}/book`}
              className={`block w-full h-12 flex items-center justify-center text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity rounded mb-4 text-center ${
                isAvailable
                  ? "bg-[#C63A07] hover:opacity-90"
                  : "bg-gray-400 cursor-not-allowed pointer-events-none"
              }`}
            >
              Book Now
            </Link>
            <div className="text-sm text-muted space-y-2">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Instant confirmation
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure booking
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free cancellation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/dashboard/properties"
          className="inline-block text-sm text-muted hover:text-[#C63A07]"
        >
          ← Back to Properties
        </Link>
      </div>
    </section>
  );
}
