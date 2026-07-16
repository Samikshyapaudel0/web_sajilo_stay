import { getPropertyById } from "@/lib/api/host/property";
import PropertyForm from "../_components/PropertyForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPropertyById(id);

  if (!result.success) {
    throw new Error("Failed to load property");
  }

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Host
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">Edit Property</h2>

      <div className="bg-white rounded-lg shadow p-8">
        <PropertyForm property={result.data} isEdit={true} />
      </div>
    </section>
  );
}
