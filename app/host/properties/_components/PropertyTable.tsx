"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Modal from "../../_components/Modal";
import { handleDeleteProperty } from "@/lib/actions/host/property-action";

export default function PropertyTable({
  data,
  pagination,
  search,
}: {
  data: any[];
  pagination: any;
  search: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<any | null>(null);

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? 0;

  const setQuery = (next: Record<string, string | number>) => {
    const q = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => q.set(k, String(v)));
    router.push(`/host/properties?${q.toString()}`);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("search") as string;
    setQuery({ search: value ?? "", page: 1 });
  };

  const onDelete = () => {
    if (!target) return;
    startTransition(async () => {
      const result = await handleDeleteProperty(target._id);
      if (result.success) {
        toast.success("Property deleted successfully");
        setTarget(null);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete property");
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-[#C63A07]">
          <p className="text-sm text-gray-600">Total Properties</p>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-2xl font-bold text-gray-900">{data?.filter((p) => p.status === "available").length || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Booked</p>
          <p className="text-2xl font-bold text-gray-900">{data?.filter((p) => p.status === "booked").length || 0}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-on-dark">My Properties</h2>
          <p className="text-sm text-muted">{total} total properties</p>
        </div>
        <Link
          href="/host/properties/add"
          className="flex h-10 items-center bg-[#C63A07] px-4 text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded"
        >
          + Add Property
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={onSearch} className="flex w-full max-w-sm gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search properties..."
            className="h-10 w-full border border-hairline bg-surface-card px-3 text-sm text-on-dark placeholder:text-muted outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded"
          />
          <button className="h-10 border border-hairline px-4 text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded">
            Search
          </button>
        </form>

        <label className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-muted">
          Rows
          <select
            value={limit}
            onChange={(e) => setQuery({ limit: e.target.value, page: 1 })}
            className="h-10 border border-hairline bg-surface-card px-2 text-sm text-on-dark outline-none focus:border-[#C63A07] rounded"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto border border-hairline rounded-lg shadow bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-hairline bg-gray-50 text-xs uppercase tracking-[1px] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Property</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price/Night</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((property) => (
                <tr
                  key={property._id}
                  className="border-b border-hairline last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {property.imageUrl ? (
                        <Image
                          src={process.env.NEXT_PUBLIC_API_BASE_URL + property.imageUrl}
                          alt={property.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      )}
                      <div>
                        <p className="text-on-dark font-medium">{property.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-body">{property.location}</td>
                  <td className="px-4 py-3 text-body">{property.category}</td>
                  <td className="px-4 py-3 text-body font-medium">${property.pricePerNight}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1px] ${
                        property.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3 text-xs font-medium uppercase tracking-[1px]">
                      <Link
                        href={`/host/properties/${property._id}`}
                        className="text-muted hover:text-[#C63A07] transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/host/properties/${property._id}/edit`}
                        className="text-muted hover:text-[#C63A07] transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setTarget(property)}
                        className="text-muted hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setQuery({ page: page - 1 })}
            className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setQuery({ page: page + 1 })}
            className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Delete property"
      >
        <p className="mb-6 text-sm text-body">
          Delete{" "}
          <span className="font-bold text-on-dark">
            {target?.title}
          </span>
          ? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setTarget(null)}
            className="h-10 border border-hairline px-4 text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:text-on-dark rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isPending}
            className="h-10 bg-[#C63A07] px-4 text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 disabled:opacity-50 rounded"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
