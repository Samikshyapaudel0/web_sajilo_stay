"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UpdateProfileFormData, updateProfileSchema } from "./schema";
import { Slide, toast } from "react-toastify";
import Image from "next/image";
import { handleUpdateProfile } from "@/lib/actions/auth_action";
export default function UpdateForm({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const formdata = new FormData();
        formdata.append("email", data.email || "");
        formdata.append("firstName", data.firstName || "");
        formdata.append("lastName", data.lastName || "");
        formdata.append("username", data.username || "");
        if (data.image) {
          formdata.append("profileImage", data.image);
        }
        const result = await handleUpdateProfile(formdata);
        if (result.success) {
          toast.success("Profile updated successfully", {
            position: "top-center", // set positiom from function iteselt
            transition: Slide,
          });
          handleDismissImage();
        } else {
          throw new Error(result.message || "Failed to update profile");
        }
      } catch (error: any) {
        toast.error(error?.message);
        setError(error?.message || "Failed to update profile");
      }
    });
  };

  const fieldClass =
    "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";
  const errClass = "mt-1 block text-sm text-m-red";

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="mb-6 border border-m-red bg-m-red/10 px-4 py-3 text-sm text-m-red rounded-lg">
            {error}
          </div>
        )}

        {/* Profile Image Section */}
        <div className="mb-8 flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            {previewImage ? (
              <div className="relative w-32 h-32">
                <img
                  src={previewImage}
                  alt="Profile Image Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                />
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <button
                      type="button"
                      onClick={() => handleDismissImage(onChange)}
                      className="absolute top-0 right-0 bg-[#C63A07] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 shadow-md"
                    >
                      ✕
                    </button>
                  )}
                />
              </div>
            ) : user?.imageUrl ? (
              <Image
                src={process.env.NEXT_PUBLIC_API_BASE_URL + user.imageUrl}
                alt="Profile Image"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-4 border-gray-100 shadow-lg">
                <span className="text-gray-400 text-sm font-medium">No Image</span>
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <label className={labelClass}>Profile Image</label>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                  accept=".jpg,.jpeg,.png,.webp"
                  className="w-full h-12 border border-hairline bg-surface-card px-4 text-sm text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#C63A07] file:text-white hover:file:bg-red-600"
                />
              )}
            />
            {errors.image && (
              <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
            )}
            <p className="text-xs text-muted mt-2">Recommended: Square image, at least 200x200px</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={fieldClass}
            />
            {errors.email && (
              <span className={errClass}>{errors.email.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="Jane"
                className={fieldClass}
              />
              {errors.firstName && (
                <span className={errClass}>{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Doe"
                className={fieldClass}
              />
              {errors.lastName && (
                <span className={errClass}>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="janedoe"
              className={fieldClass}
            />
            {errors.username && (
              <span className={errClass}>{errors.username.message}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="mt-8 flex h-12 w-full items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 disabled:opacity-50 rounded-lg shadow-md"
        >
          {isPending ? "Updating profile..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
