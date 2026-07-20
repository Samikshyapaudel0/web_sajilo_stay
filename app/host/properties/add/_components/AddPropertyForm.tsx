"use client";
import { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { toast, Slide } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleCreateProperty } from "@/lib/actions/host/property-action";
import { PropertyFormData, propertySchema } from "../../_components/schema";

export default function AddPropertyForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema as any),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      pricePerNight: 0,
      category: "",
      amenities: "",
      status: "available",
    },
  });

  const handleImagesChange = (
    files: FileList | null,
    onChange: (files: FileList | null) => void,
  ) => {
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setPreviewImages(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviewImages([]);
    }
    onChange(files);
  };

  const handleDismissImages = (onChange?: (files: FileList | null) => void) => {
    setPreviewImages([]);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: PropertyFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("location", data.location);
        formData.append("pricePerNight", String(data.pricePerNight));
        formData.append("category", data.category);
        if (data.amenities) {
          formData.append("amenities", data.amenities);
        }
        formData.append("status", data.status);

        if (data.images && data.images.length > 0) {
          Array.from(data.images).forEach((file) => {
            formData.append("images", file);
          });
        }

        const result = await handleCreateProperty(formData);
        if (result.success) {
          toast.success("Property created successfully", {
            position: "top-center",
            transition: Slide,
          });
          reset();
          handleDismissImages();
          router.push("/host/properties");
        } else {
          throw new Error(result.message || "Failed to create property");
        }
      } catch (error: any) {
        toast.error(error?.message);
        setError(error?.message || "Failed to create property");
      }
    });
  };

  const fieldClass =
    "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";
  const errClass = "mt-1 block text-sm text-m-red";
  const textareaClass =
    "w-full border border-hairline bg-surface-card px-4 py-3 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg resize-none";

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="mb-6 border border-m-red bg-m-red/10 px-4 py-3 text-sm text-m-red rounded-lg">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              {...register("title")}
              placeholder="Beautiful Beach Villa"
              className={fieldClass}
            />
            {errors.title && (
              <span className={errClass}>{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              placeholder="Describe your property..."
              rows={4}
              className={textareaClass}
            />
            {errors.description && (
              <span className={errClass}>{errors.description.message}</span>
            )}
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              {...register("location")}
              placeholder="Kathmandu, Nepal"
              className={fieldClass}
            />
            {errors.location && (
              <span className={errClass}>{errors.location.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Price Per Night</label>
              <input
                type="number"
                {...register("pricePerNight", { valueAsNumber: true })}
                placeholder="100"
                className={fieldClass}
              />
              {errors.pricePerNight && (
                <span className={errClass}>{errors.pricePerNight.message}</span>
              )}
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                {...register("category")}
                className={fieldClass}
              >
                <option value="">Select category</option>
                <option value="apartment">Apartment</option>
                <option value="home">Home</option>
                <option value="room">Room</option>
                <option value="hostel">Hostel</option>
              </select>
              {errors.category && (
                <span className={errClass}>{errors.category.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Amenities</label>
            <textarea
              {...register("amenities")}
              placeholder="WiFi, AC, Parking, Pool, Kitchen..."
              rows={3}
              className={textareaClass}
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              {...register("status")}
              className={fieldClass}
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
            {errors.status && (
              <span className={errClass}>{errors.status.message}</span>
            )}
          </div>

          {/* Images Section */}
          <div className="mb-8">
            <label className={labelClass}>Property Images</label>
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) =>
                    handleImagesChange(e.target.files, onChange)
                  }
                  accept=".jpg,.jpeg,.png,.webp"
                  className="w-full h-12 border border-hairline bg-surface-card px-4 text-sm text-on-dark outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#C63A07] file:text-white hover:file:bg-red-600"
                />
              )}
            />
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview Rs {index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="mt-8 flex h-12 w-full items-center justify-center bg-[#C63A07] text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 disabled:opacity-50 rounded-lg shadow-md"
        >
          {isPending ? "Creating property..." : "Create Property"}
        </button>
      </form>
    </div>
  );
}


