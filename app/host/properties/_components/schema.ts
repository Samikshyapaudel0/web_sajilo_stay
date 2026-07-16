import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required").min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required").min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required").min(3, "Location must be at least 3 characters"),
  pricePerNight: z.coerce.number().min(1, "Price per night is required").positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  amenities: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  images: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    }, "Max file size is 5MB")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, "Only .jpg, .jpeg, .png and .webp formats are supported"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
