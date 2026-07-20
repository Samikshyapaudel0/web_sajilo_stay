import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get(API.HOST.BOOKINGS.GET_ALL);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
  }
};

export const confirmBooking = async (id: string) => {
  try {
    const response = await axiosInstance.put(API.HOST.BOOKINGS.CONFIRM(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to confirm booking");
  }
};

export const rejectBooking = async (id: string) => {
  try {
    const response = await axiosInstance.put(API.HOST.BOOKINGS.REJECT(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to reject booking");
  }
};
