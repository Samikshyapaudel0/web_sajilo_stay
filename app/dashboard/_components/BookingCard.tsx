"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import BookingStatusBadge from "./BookingStatusBadge";
import { handleCancelBooking } from "@/lib/actions/booking_action";

export interface BookingData {
  _id: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: string;
  property?: {
    _id?: string;
    title?: string;
    location?: string;
    images?: string[] | null;
  } | null;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BookingCard({
  booking,
  showCancel = false,
  faded = false,
}: {
  booking: BookingData;
  showCancel?: boolean;
  faded?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = () => {
    startTransition(async () => {
      try {
        const result = await handleCancelBooking(booking._id);
        if (result.success) {
          toast.success(result.message || "Booking cancelled", {
            position: "top-center",
            transition: Slide,
          });
          router.refresh();
        } else {
          toast.error(result.message || "Failed to cancel booking", {
            position: "top-center",
            transition: Slide,
          });
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to cancel booking", {
          position: "top-center",
          transition: Slide,
        });
      }
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 ${faded ? "opacity-75" : ""}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {booking.property?.images && booking.property.images.length > 0 && (
          <div className="relative w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${booking.property.images[0]}`}
              alt={booking.property.title || "Property"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
            <div>
              <h4 className="text-lg font-bold text-on-dark mb-1">
                {booking.property?.title || "Property"}
              </h4>
              <p className="text-sm text-muted">
                {booking.property?.location || ""}
              </p>
            </div>
            <BookingStatusBadge status={booking.status} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted">Check-in</p>
              <p className="text-on-dark font-medium">
                {formatDate(booking.checkInDate)}
              </p>
            </div>
            <div>
              <p className="text-muted">Check-out</p>
              <p className="text-on-dark font-medium">
                {formatDate(booking.checkOutDate)}
              </p>
            </div>
            <div>
              <p className="text-muted">Guests</p>
              <p className="text-on-dark font-medium">{booking.guests}</p>
            </div>
            <div>
              <p className="text-muted">Total</p>
              <p className="text-on-dark font-bold text-[#C63A07]">
                Rs {booking.totalPrice}
              </p>
            </div>
          </div>
          {showCancel && booking.status === "pending" && (
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="mt-4 h-10 px-4 border border-red-300 text-xs font-bold uppercase tracking-[1.5px] text-red-600 transition-colors hover:bg-red-50 rounded-lg disabled:opacity-50"
            >
              {isPending ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
