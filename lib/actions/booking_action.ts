"use server";

import {
  createBooking,
  cancelBooking,
} from "@/lib/api/user/booking";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export interface CreateBookingInput {
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export const handleCreateBooking = async (data: CreateBookingInput) => {
  try {
    console.log("handleCreateBooking called with data:", data);
    const result = await createBooking(data);
    console.log("createBooking result:", result);
    if (result.success) {
      await revalidatePath("/dashboard/bookings");
      redirect("/dashboard/bookings", RedirectType.replace);
    } else {
      return {
        success: false,
        message: result.message || "Failed to create booking",
      };
    }
  } catch (error: Error | any) {
    console.log("handleCreateBooking error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create booking",
    };
  }
};

export const handleCancelBooking = async (id: string) => {
  try {
    const result = await cancelBooking(id);
    if (result.success) {
      await revalidatePath("/dashboard/bookings");
      return {
        success: true,
        message: result.message || "Booking cancelled successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to cancel booking",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to cancel booking",
    };
  }
};
