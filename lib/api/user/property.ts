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

    console.log("SUCCESS RESPONSE:", response.data);
    return response.data;
  } catch (error: Error | any) {
    console.log("FULL ERROR:", error);
    console.log("MESSAGE:", error.message);
    console.log("CODE:", error.code);
    console.log("CONFIG:", error.config);
    console.log("RESPONSE:", error.response);

    // Return error response instead of throwing to prevent page crashes
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch properties",
      data: [],
    };
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.USER.PROPERTIES.GET_BY_ID(id));
    return response.data;
  } catch (error: Error | any) {
    console.log("Property fetch error:", error);
    // Return error response instead of throwing
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch property",
      data: null,
    };
  }
};
