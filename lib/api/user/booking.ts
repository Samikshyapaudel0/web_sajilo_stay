import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const getAllBookings = async (params: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await axiosInstance.get(API.USER.BOOKINGS.GET_ALL, {
      params,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
  }
};

export const getBookingById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.USER.BOOKINGS.GET_BY_ID(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch booking");
  }
};

export const createBooking = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.USER.BOOKINGS.CREATE, data);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to create booking");
  }
};

export const cancelBooking = async (id: string) => {
  try {
    const response = await axiosInstance.post(API.USER.BOOKINGS.CANCEL(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to cancel booking");
  }
};
