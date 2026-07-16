import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const getAllProperties = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
}) => {
  try {
    const response = await axiosInstance.get(API.USER.PROPERTIES.GET_ALL, {
      params,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch properties");
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.USER.PROPERTIES.GET_BY_ID(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch property");
  }
};
