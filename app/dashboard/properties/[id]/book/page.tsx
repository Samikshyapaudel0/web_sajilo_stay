import BookingForm from "@/app/dashboard/_components/BookingForm";
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
      <section className="mx-auto w-full max-w-[1440px]">
        <Link
          href={`/dashboard/properties/${id}`}
          className="inline-block mb-6 text-sm text-muted hover:text-[#C63A07]"
        >
          ← Back to Property
        </Link>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-muted text-lg">Property not found or API unavailable</p>
        </div>
      </section>
    );
  }

  const imageUrl =
    property.images && property.images.length > 0 ? property.images[0] : null;

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <Link
        href={`/dashboard/properties/${id}`}
        className="inline-block mb-6 text-sm text-muted hover:text-[#C63A07]"
      >
        ← Back to Property
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              {imageUrl ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${imageUrl}`}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-on-dark mb-2">
                {property.title}
              </h2>
              <p className="text-sm text-muted mb-4">{property.location}</p>
              <p className="text-2xl font-bold text-[#C63A07]">
                Rs {property.pricePerNight}/night
              </p>
            </div>
          </div>

          {property.description && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-on-dark mb-3">Description</h3>
              <p className="text-body leading-relaxed">{property.description}</p>
            </div>
          )}

          {property.amenities && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-on-dark mb-3">Amenities</h3>
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
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-on-dark mb-6">
            Request Booking
          </h2>
          <BookingForm
            propertyId={property._id}
            pricePerNight={property.pricePerNight}
          />
        </div>
      </div>
    </section>
  );
}
