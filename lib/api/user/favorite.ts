import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const getAllFavorites = async () => {
  try {
    const response = await axiosInstance.get(API.USER.FAVORITES.GET_ALL);
    return response.data;
  } catch (error: Error | any) {
    console.log("Favorites fetch error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch favorites",
      data: [],
    };
  }
};

export const addFavorite = async (propertyId: string) => {
  try {
    const response = await axiosInstance.post(
      API.USER.FAVORITES.CREATE,
      { propertyId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: Error | any) {
    console.log("Add favorite error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to add favorite",
    };
  }
};

export const removeFavorite = async (propertyId: string) => {
  try {
    const response = await axiosInstance.delete(
      API.USER.FAVORITES.DELETE(propertyId),
    );
    return response.data;
  } catch (error: Error | any) {
    console.log("Remove favorite error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to remove favorite",
    };
  }
};
