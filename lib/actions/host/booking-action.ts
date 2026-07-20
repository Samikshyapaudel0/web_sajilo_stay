"use server";
import { confirmBooking, rejectBooking } from "@/lib/api/host/booking";
import { revalidatePath } from "next/cache";

export const handleConfirmBooking = async (id: string) => {
  try {
    const result = await confirmBooking(id);
    if (result.success) {
      await revalidatePath("/host/bookings");
      return {
        success: true,
        message: result.message || "Booking confirmed successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to confirm booking",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to confirm booking",
    };
  }
};

export const handleRejectBooking = async (id: string) => {
  try {
    const result = await rejectBooking(id);
    if (result.success) {
      await revalidatePath("/host/bookings");
      return {
        success: true,
        message: result.message || "Booking rejected successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to reject booking",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to reject booking",
    };
  }
};
