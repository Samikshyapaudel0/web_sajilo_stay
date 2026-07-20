"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";

export default function BookingRequestSection({
  propertyId,
  pricePerNight,
}: {
  propertyId: string;
  pricePerNight: number;
}) {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="block w-full h-12 flex items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded-lg mb-4"
      >
        Request Booking
      </button>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-on-dark mb-4">Request Booking</h3>
      <BookingForm
        propertyId={propertyId}
        pricePerNight={pricePerNight}
        onSuccess={() => setShowForm(false)}
        onCancel={() => setShowForm(false)}
      />
    </div>
  );
}
