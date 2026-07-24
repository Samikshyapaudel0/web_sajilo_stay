import { getAllFavorites } from "@/lib/api/user/favorite";
import Link from "next/link";
import PropertyCard from "../_components/PropertyCard";

export default async function Page() {
  let favorites: any[] = [];

  try {
    const result = await getAllFavorites();
    favorites = result.success ? result.data : [];
  } catch (error) {
    console.log("API not available, showing empty state");
  }

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Dashboard
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">My Favorites</h2>

      {favorites && favorites.length > 0 ? (
        <>
          <div className="mb-4">
            <p className="text-sm text-muted">
              {favorites.length} {favorites.length === 1 ? "property" : "properties"} saved
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite: any) => (
              <PropertyCard
                key={favorite._id}
                property={favorite.property || { ...favorite, _id: favorite.propertyId }}
                isFavorited={true}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-muted text-lg mb-4">No favorites yet</p>
          <p className="text-muted text-sm mb-6">Start saving properties you love</p>
          <Link
            href="/dashboard/properties"
            className="inline-block h-12 px-6 bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </section>
  );
}
