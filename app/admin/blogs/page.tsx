import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-[#C63A07]">
          <p className="text-sm text-gray-600">Total Blogs</p>
          <p className="text-2xl font-bold text-gray-900">156</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Published</p>
          <p className="text-2xl font-bold text-gray-900">142</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Drafts</p>
          <p className="text-2xl font-bold text-gray-900">14</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-on-dark">Blogs</h2>
          <p className="text-sm text-muted">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="flex h-10 items-center bg-[#C63A07] px-4 text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded"
        >
          + New Blog
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form className="flex w-full max-w-sm gap-2">
          <input
            name="search"
            placeholder="Search blogs..."
            className="h-10 w-full border border-hairline bg-surface-card px-3 text-sm text-on-dark placeholder:text-muted outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded"
          />
          <button className="h-10 border border-hairline px-4 text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded">
            Search
          </button>
        </form>

        <label className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-muted">
          Status
          <select className="h-10 border border-hairline bg-surface-card px-2 text-sm text-on-dark outline-none focus:border-[#C63A07] rounded">
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto border border-hairline rounded-lg shadow bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-hairline bg-gray-50 text-xs uppercase tracking-[1px] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hairline last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-on-dark font-medium">Top 10 Places to Visit in Nepal</td>
              <td className="px-4 py-3 text-body">Admin</td>
              <td className="px-4 py-3 text-body">Travel</td>
              <td className="px-4 py-3">
                <span className="inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1px] bg-green-100 text-green-800">
                  Published
                </span>
              </td>
              <td className="px-4 py-3 text-body">2024-01-15</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3 text-xs font-medium uppercase tracking-[1px]">
                  <button className="text-muted hover:text-[#C63A07] transition-colors">View</button>
                  <button className="text-muted hover:text-[#C63A07] transition-colors">Edit</button>
                  <button className="text-muted hover:text-red-600 transition-colors">Delete</button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-hairline last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-on-dark font-medium">Best Hotels in Pokhara</td>
              <td className="px-4 py-3 text-body">Admin</td>
              <td className="px-4 py-3 text-body">Accommodation</td>
              <td className="px-4 py-3">
                <span className="inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1px] bg-green-100 text-green-800">
                  Published
                </span>
              </td>
              <td className="px-4 py-3 text-body">2024-01-12</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3 text-xs font-medium uppercase tracking-[1px]">
                  <button className="text-muted hover:text-[#C63A07] transition-colors">View</button>
                  <button className="text-muted hover:text-[#C63A07] transition-colors">Edit</button>
                  <button className="text-muted hover:text-red-600 transition-colors">Delete</button>
                </div>
              </td>
            </tr>
            <tr className="border-b border-hairline last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-on-dark font-medium">Trekking Guide for Beginners</td>
              <td className="px-4 py-3 text-body">Admin</td>
              <td className="px-4 py-3 text-body">Adventure</td>
              <td className="px-4 py-3">
                <span className="inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1px] bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              </td>
              <td className="px-4 py-3 text-body">2024-01-10</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3 text-xs font-medium uppercase tracking-[1px]">
                  <button className="text-muted hover:text-[#C63A07] transition-colors">View</button>
                  <button className="text-muted hover:text-[#C63A07] transition-colors">Edit</button>
                  <button className="text-muted hover:text-red-600 transition-colors">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>Page 1 of 1</span>
        <div className="flex gap-2">
          <button disabled className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded">
            Prev
          </button>
          <button disabled className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
