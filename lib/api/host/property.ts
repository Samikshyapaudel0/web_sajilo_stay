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
    // } catch (error: Error | any) {
    //   throw new Error(error?.response?.data?.message || "Failed to fetch properties");
    // }
  } catch (error: any) {
     console.log("========== CREATE PROPERTY ERROR ==========");
     console.log("Status:", error.response?.status);
     console.log("Data:", error.response?.data);
     console.log("Message:", error.message);
     console.log("==========================================");

    throw new Error(
      error?.response?.data?.message ||
        error.message ||
        "Failed to create property",
    );
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

// export const createProperty = async (data: any) => {
//   console.log("[createProperty API] Called with data type:", typeof data);
//   console.log("[createProperty API] Endpoint:", API.HOST.PROPERTIES.CREATE);
//   try {
//     console.log("[createProperty API] About to call axiosInstance.post...");
//     const response = await axiosInstance.post(API.HOST.PROPERTIES.CREATE, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("[createProperty API] Response received:", response.data);
//     return response.data; // response body
//   } catch (error: Error | any) {
//     console.error("[createProperty API] Error:", error);
//     console.error("[createProperty API] Error response:", error.response?.data);
//     console.error("[createProperty API] Error message:", error.message);
//     throw new Error(error?.response?.data?.message || "Failed to create property");
//   }
// };

export const createProperty = async (data: FormData) => {
  console.log("========== FORMDATA ==========");

  for (const [key, value] of data.entries()) {
    console.log(key, value);
  }

  console.log("==============================");

  try {
    const response = await axiosInstance.post(API.HOST.PROPERTIES.CREATE, data);

    console.log("SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("========== CREATE PROPERTY ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Message:", error.message);
    console.log("==========================================");

    throw error;
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



