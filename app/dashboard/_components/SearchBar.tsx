"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);
    router.push(`/dashboard/properties?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title or location..."
            className="h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="apartment">Apartment</option>
            <option value="home">Home</option>
            <option value="hostel">Hostel</option>
            <option value="room">Room</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-[1.5px] text-body mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg"
          >
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="h-12 w-full bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
