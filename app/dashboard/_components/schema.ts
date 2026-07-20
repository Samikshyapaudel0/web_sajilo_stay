import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .min(2, { message: "Minimum 2 characters" }),
  lastName: z.string().min(2, { message: "Minimum 2 characters" }),
  email: z.string().email({
    message: "Invalid email address",
  }),

  username: z.string().min(3, { message: "Minimum 3 characters" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, { message: "Minimum 6 characters" }),
    newPassword: z
      .string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Minimum 6 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
