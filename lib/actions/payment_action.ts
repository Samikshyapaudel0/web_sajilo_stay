"use server";

import { initiatePayment, verifyPayment } from "@/lib/api/user/payment";
import { revalidatePath } from "next/cache";

export interface InitiatePaymentInput {
  bookingId: string;
  returnUrl: string;
}

export const handleInitiatePayment = async (data: InitiatePaymentInput) => {
  try {
    console.log("handleInitiatePayment called with data:", data);
    const result = await initiatePayment(data.bookingId, data.returnUrl);
    console.log("initiatePayment result:", result);
    if (result.success) {
      return {
        success: true,
        paymentUrl: result.paymentUrl,
        message: result.message || "Payment initiated successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to initiate payment",
      };
    }
  } catch (error: Error | any) {
    console.log("handleInitiatePayment error:", error);
    return {
      success: false,
      message: error?.message || "Failed to initiate payment",
    };
  }
};

export interface VerifyPaymentInput {
  pidx: string;
  transactionId: string;
  amount: number;
  bookingId: string;
}

export const handleVerifyPayment = async (data: VerifyPaymentInput) => {
  try {
    console.log("handleVerifyPayment called with data:", data);
    const result = await verifyPayment(data);
    console.log("verifyPayment result:", result);
    if (result.success) {
      await revalidatePath("/dashboard/bookings");
      return {
        success: true,
        message: result.message || "Payment verified successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to verify payment",
      };
    }
  } catch (error: Error | any) {
    console.log("handleVerifyPayment error:", error);
    return {
      success: false,
      message: error?.message || "Failed to verify payment",
    };
  }
};
