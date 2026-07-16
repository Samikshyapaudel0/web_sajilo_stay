import { getPropertyById } from "@/lib/api/user/property";
import Image from "next/image";
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
    // API not available - show error state
    console.log("API not available");
  }

  if (!property) {
    return (
      <section className="mx-auto w-full max-w-[1440px]">
        <Link
          href="/dashboard/properties"
          className="inline-block mb-6 text-sm text-muted hover:text-[#C63A07]"
        >
          ← Back to Properties
        </Link>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-muted text-lg">Property not found or API unavailable</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <Link
        href="/dashboard/properties"
        className="inline-block mb-6 text-sm text-muted hover:text-[#C63A07]"
      >
        ← Back to Properties
      </Link>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96 bg-gray-200">
          {property.imageUrl ? (
            <Image
              src={process.env.NEXT_PUBLIC_API_BASE_URL + property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-xl">No Image Available</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span
              className={`inline-block rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[1px] ${
                property.status === "available"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {property.status}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-on-dark mb-4">
                {property.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted">{property.location}</span>
                <span className="text-sm text-muted">•</span>
                <span className="text-sm text-muted">{property.category}</span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-on-dark mb-3">Description</h2>
                <p className="text-body leading-relaxed">{property.description}</p>
              </div>

              {property.amenities && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-on-dark mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.split(',').map((amenity: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-sm text-body rounded-full"
                      >
                        {amenity.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <div className="mb-6">
                  <p className="text-sm text-muted mb-1">Price per night</p>
                  <p className="text-3xl font-bold text-[#C63A07]">
                    ${property.pricePerNight}
                  </p>
                </div>

                <Link
                  href={`/dashboard/properties/${property._id}/book`}
                  className="block w-full h-12 flex items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg mb-4"
                >
                  Request Booking
                </Link>

                <div className="text-sm text-muted">
                  <p className="mb-2">• Free cancellation up to 24 hours</p>
                  <p>• No booking fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
