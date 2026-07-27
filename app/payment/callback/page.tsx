"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slide, toast } from "react-toastify";
import { handleVerifyPayment } from "@/lib/actions/payment_action";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const oid = searchParams.get("oid");
        const refId = searchParams.get("refId");
        const amt = searchParams.get("amt");

        if (!oid || !refId || !amt) {
          toast.error("Missing payment parameters", {
            position: "top-center",
            transition: Slide,
          });
          router.push("/dashboard/bookings");
          return;
        }

        const result = await handleVerifyPayment({
          pidx: refId,
          transactionId: refId,
          amount: parseFloat(amt),
          bookingId: oid,
        });

        if (result.success) {
          toast.success(result.message || "Payment verified successfully", {
            position: "top-center",
            transition: Slide,
          });
        } else {
          toast.error(result.message || "Payment verification failed", {
            position: "top-center",
            transition: Slide,
          });
        }
      } catch (error: any) {
        toast.error(error?.message || "Payment verification failed", {
          position: "top-center",
          transition: Slide,
        });
      } finally {
        setIsVerifying(false);
        setTimeout(() => {
          router.push("/dashboard/bookings");
        }, 2000);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-on-dark mb-2">
          {isVerifying ? "Verifying Payment..." : "Redirecting..."}
        </h2>
        <p className="text-muted">
          {isVerifying
            ? "Please wait while we verify your payment"
            : "You will be redirected to your bookings page"}
        </p>
      </div>
    </div>
  );
}
