import Link from "next/link";
import Image from "next/image";

export default function PropertyCard({ property }: { property: any }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
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
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1px] ${
              property.status === "available"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-on-dark mb-2">{property.title}</h3>
        <p className="text-sm text-muted mb-3">{property.location}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-body">{property.category}</span>
          <span className="text-lg font-bold text-[#C63A07]">
            ${property.pricePerNight}/night
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/host/properties/${property._id}`}
            className="flex-1 h-10 flex items-center justify-center border border-hairline text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded"
          >
            View
          </Link>
          <Link
            href={`/host/properties/${property._id}/edit`}
            className="flex-1 h-10 flex items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
