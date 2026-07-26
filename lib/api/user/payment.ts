import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const initiatePayment = async (bookingId: string, returnUrl: string) => {
  try {
    const response = await axiosInstance.post(API.USER.PAYMENTS.INITIATE, {
      bookingId,
      return_url: returnUrl,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to initiate payment");
  }
};

export const verifyPayment = async (data: {
  pidx: string;
  transactionId: string;
  amount: number;
  bookingId: string;
}) => {
  try {
    const response = await axiosInstance.post(API.USER.PAYMENTS.VERIFY, data);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to verify payment");
  }
};
