export default function Page() {
  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted">
        Host
      </p>
      <h2 className="mb-8 text-3xl font-bold text-on-dark">Dashboard</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#C63A07]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Properties</h3>
            <span className="text-2xl">🏠</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-green-600 mt-2">+2 new this month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Available Properties</h3>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-500 mt-2">Ready to book</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Booked Properties</h3>
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">4</p>
          <p className="text-sm text-gray-500 mt-2">Currently occupied</p>
        </div>
      </div>
    </section>
  );
}
