"use server";
import {
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/api/host/property";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

// export const handleCreateProperty = async (formData: FormData) => {
//   try {
//     const result = await createProperty(formData);
//     if (result.success) {
//       await revalidatePath("/host/properties");
//       redirect("/host/properties", RedirectType.replace);
//     } else {
//       return {
//         success: false,
//         message: result.message || "Failed to create property",
//       };
//     }
//   } catch (error: Error | any) {
//     return {
//       success: false,
//       message: error?.message || "Failed to create property",
//     };
//   }
// };

export const handleCreateProperty = async (formData: FormData) => {
  try {
    console.log("===== SERVER ACTION FORMDATA =====");

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    console.log("===============================");

    const result = await createProperty(formData);

    console.log("RESULT:", result);

    if (result.success) {
      await revalidatePath("/host/properties");
    }

    return result;
  } catch (error: any) {
    console.error("CREATE PROPERTY ERROR:", error);

    return {
      success: false,
      message: error?.message || "Failed to create property",
    };
  }
};
export const handleUpdateProperty = async (id: string, formData: FormData) => {
  try {
    const result = await updateProperty(id, formData);
    if (result.success) {
      await revalidatePath("/host/properties");
      redirect("/host/properties", RedirectType.replace);
    } else {
      return {
        success: false,
        message: result.message || "Failed to update property",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to update property",
    };
  }
};

export const handleDeleteProperty = async (id: string) => {
  try {
    const result = await deleteProperty(id);
    if (result.success) {
      await revalidatePath("/host/properties");
      return {
        success: true,
        message: "Property deleted successfully",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to delete property",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to delete property",
    };
  }
};
