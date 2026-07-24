"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "@/lib/api/user/favorite";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/api/axios_instance";

interface PropertyCardProps {
  property: any;
  isFavorited?: boolean;
  onFavoriteToggle?: (propertyId: string, isFavorited: boolean) => void;
}

export default function PropertyCard({
  property,
  isFavorited: initialFavorited = false,
  onFavoriteToggle,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);

  console.log("API URL:", API_BASE_URL);
  console.log("Property images:", property.images);
  useEffect(() => {
    setIsFavorited(initialFavorited);
  }, [initialFavorited]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      const propId = property._id || property.id || property.propertyId;
      if (isFavorited) {
        const result = await removeFavorite(propId);
        if (result.success) {
          setIsFavorited(false);
          toast.success("Removed from favorites");
          onFavoriteToggle?.(propId, false);
        } else {
          toast.error(result.message || "Failed to remove from favorites");
        }
      } else {
        const result = await addFavorite(propId);
        if (result.success) {
          setIsFavorited(true);
          toast.success("Added to favorites");
          onFavoriteToggle?.(propId, true);
        } else {
          toast.error(result.message || "Failed to add to favorites");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {property.images && property.images.length > 0 ? (
          <img
            src={`${API_BASE_URL}/uploads/${property.images[0]}`}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
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
        <h3 className="text-lg font-bold text-on-dark mb-2">
          {property.title}
        </h3>
        <p className="text-sm text-muted mb-3">{property.location}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-body">{property.category}</span>
          <span className="text-lg font-bold text-[#C63A07]">
            Rs {property.pricePerNight}/night
          </span>
        </div>
        <Link
          href={`/dashboard/properties/${property._id}`}
          className="block w-full h-10 flex items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
