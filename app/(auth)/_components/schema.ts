// // import { z } from "zod";

// // export const loginSchema = z.object({
// //   email: z.email("Invalid email address"),
// //   password: z.string().min(6, "Password must be at least 6 characters"),
// // });
// // export type LoginFormData = z.infer<typeof loginSchema>;

// // export const registerSchema = z
// //   .object({
// //     fullName: z.string().min(2, "Enter your full name"),
// //     email: z.email("Invalid email address"),
// //     password: z.string().min(6, "Password must be at least 6 characters"),
// //     confirmPassword: z
// //       .string()
// //       .min(6, "Confirm Password must be at least 6 characters"),
// //   })
// //   .refine((data) => data.password === data.confirmPassword, {
// //     message: "Passwords do not match",
// //   });
// // export type RegisterFormData = z.infer<typeof registerSchema>;

// import { z } from "zod";

// export const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),

//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export type LoginFormData = z.infer<typeof loginSchema>;

// export const registerSchema = z
//   .object({
//     fullname: z.string().min(2, "Enter your full name"),

//     email: z.string().email("Invalid email address"),

//     password: z.string().min(6, "Password must be at least 6 characters"),

//     confirmPassword: z
//       .string()
//       .min(6, "Confirm Password must be at least 6 characters"),

//   })

//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export type RegisterFormData = z.infer<typeof registerSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),

    lastName: z.string().min(2, "Last name is required"),

    username: z.string().min(3, "Username must be at least 3 characters"),

    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["male", "female", "other"], {

      message: "Please select a gender",


    
    }),

    email: z.string().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;