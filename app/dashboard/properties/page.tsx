import { getAllProperties } from "@/lib/api/user/property";
import PropertyCard from "../_components/PropertyCard";
import SearchBar from "../_components/SearchBar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 12;
  const search = query.search ? (query.search as string) : "";
  const category = query.category ? (query.category as string) : "";
  const sortBy = query.sortBy ? (query.sortBy as string) : "";

  let data: any[] = [];
  let pagination: any = null;

  try {
    const result = await getAllProperties({ page, limit, search, category, sortBy });
    if (result.success) {
      data = result.data;
      pagination = result.pagination;
    }
  } catch (error) {
    // API not available - show empty state
    console.log("API not available, showing empty state");
  }

  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Dashboard
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">Browse Properties</h2>

      <div className="mb-8">
        <SearchBar />
      </div>

      {data && data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {data.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

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
                    if (search) params.set("search", search);
                    if (category) params.set("category", category);
                    if (sortBy) params.set("sortBy", sortBy);
                    params.set("page", String(pagination.page - 1));
                    window.location.href = `/dashboard/properties?${params.toString()}`;
                  }}
                  className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
                >
                  Prev
                </button>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (search) params.set("search", search);
                    if (category) params.set("category", category);
                    if (sortBy) params.set("sortBy", sortBy);
                    params.set("page", String(pagination.page + 1));
                    window.location.href = `/dashboard/properties?${params.toString()}`;
                  }}
                  className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-muted text-lg">No properties found</p>
          <p className="text-muted text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </section>
  );
}
