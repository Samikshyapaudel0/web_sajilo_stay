"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import { handleCreateBooking } from "@/lib/actions/booking_action";

interface BookingFormProps {
  propertyId: string;
  pricePerNight: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function BookingForm({
  propertyId,
  pricePerNight,
  onSuccess,
  onCancel,
}: BookingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const estimatedTotal = nights > 0 ? pricePerNight * nights : 0;

  const fieldClass =
    "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark outline-none transition-colors focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates", {
        position: "top-center",
        transition: Slide,
      });
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      toast.error("Check-out date must be after check-in date", {
        position: "top-center",
        transition: Slide,
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await handleCreateBooking({
          propertyId,
          checkInDate,
          checkOutDate,
          guests,
        });

        if (result?.success === false) {
          toast.error(result.message || "Failed to create booking", {
            position: "top-center",
            transition: Slide,
          });
        } else {
          // onSuccess?.();
          // router.refresh();
          toast.success("Booking request submitted!");

          router.push("/dashboard/bookings");
        }
      } catch (error: any) {
        if (error?.message !== "NEXT_REDIRECT") {
          toast.error(error?.message || "Failed to create booking", {
            position: "top-center",
            transition: Slide,
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkInDate" className={labelClass}>
            Check-in Date
          </label>
          <input
            id="checkInDate"
            type="date"
            value={checkInDate}
            min={today}
            required
            onChange={(e) => setCheckInDate(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="checkOutDate" className={labelClass}>
            Check-out Date
          </label>
          <input
            id="checkOutDate"
            type="date"
            value={checkOutDate}
            min={checkInDate || today}
            required
            onChange={(e) => setCheckOutDate(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="guests" className={labelClass}>
          Number of Guests
        </label>
        <input
          id="guests"
          type="number"
          min={1}
          max={10}
          required
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
          className={fieldClass}
        />
      </div>

      {nights > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">
              Rs {pricePerNight} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span className="text-on-dark font-medium">
              Rs {estimatedTotal}
            </span>
          </div>
          <p className="text-xs text-muted">
            Final price is calculated by the server at booking time.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 h-12 bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit Booking Request"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-12 px-6 border border-hairline text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>

      <p className="text-sm text-muted">
        This is a booking request. The host will review and confirm your
        booking.
      </p>
    </form>
  );
}
