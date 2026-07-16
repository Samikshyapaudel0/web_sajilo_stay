import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const getAllProperties = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const response = await axiosInstance.get(API.HOST.PROPERTIES.GET_ALL, {
      params,
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch properties");
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.HOST.PROPERTIES.GET_BY_ID(id));
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch property");
  }
};

export const createProperty = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.HOST.PROPERTIES.CREATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to create property");
  }
};

export const updateProperty = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(API.HOST.PROPERTIES.UPDATE(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to update property");
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const response = await axiosInstance.delete(API.HOST.PROPERTIES.DELETE(id));
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to delete property");
  }
};



