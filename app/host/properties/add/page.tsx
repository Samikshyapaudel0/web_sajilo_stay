import PropertyForm from "../_components/PropertyForm";

export default function Page() {
  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Host
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">Add Property</h2>

      <div className="bg-white rounded-lg shadow p-8">
        <PropertyForm />
      </div>
    </section>
  );
}






