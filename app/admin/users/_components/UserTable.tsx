"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Modal from "../../_components/Modal";
import { handleDeleteUser } from "@/lib/actions/admin/user-action";

export default function UserTable({
  data,
  pagination,
  search,
}: {
  data: any[];
  pagination: any;
  search: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<any | null>(null); // user pending deletion

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? 0;

  // push a new query string, keeping existing params
  const setQuery = (next: Record<string, string | number>) => {
    const q = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => q.set(k, String(v)));
    router.push(`/admin/users?${q.toString()}`);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("search") as string;
    setQuery({ search: value ?? "", page: 1 });
  };

  const onDelete = () => {
    if (!target) return;
    startTransition(async () => {
      const result = await handleDeleteUser(target._id);
      if (result.success) {
        toast.success("User deleted");
        setTarget(null);
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-[#C63A07]">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Admin Users</p>
          <p className="text-2xl font-bold text-gray-900">{data?.filter((u) => u.role === "admin").length || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Regular Users</p>
          <p className="text-2xl font-bold text-gray-900">{data?.filter((u) => u.role !== "admin").length || 0}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-on-dark">Users</h2>
          <p className="text-sm text-muted">{total} total users</p>
        </div>
        <Link
          href="/admin/users/create"
          className="flex h-10 items-center bg-[#C63A07] px-4 text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 rounded"
        >
          + New user
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={onSearch} className="flex w-full max-w-sm gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search users..."
            className="h-10 w-full border border-hairline bg-surface-card px-3 text-sm text-on-dark placeholder:text-muted outline-none focus:border-[#C63A07] focus:ring-1 focus:ring-[#C63A07] rounded"
          />
          <button className="h-10 border border-hairline px-4 text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded">
            Search
          </button>
        </form>

        <label className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-muted">
          Rows
          <select
            value={limit}
            onChange={(e) => setQuery({ limit: e.target.value, page: 1 })}
            className="h-10 border border-hairline bg-surface-card px-2 text-sm text-on-dark outline-none focus:border-[#C63A07] rounded"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto border border-hairline rounded-lg shadow bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-hairline bg-gray-50 text-xs uppercase tracking-[1px] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-hairline last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-on-dark font-medium">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-3 text-body">{u.email}</td>
                  <td className="px-4 py-3 text-body">{u.username}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1px] ${
                        u.role === "admin"
                          ? "bg-[#C63A07]/10 text-[#C63A07]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3 text-xs font-medium uppercase tracking-[1px]">
                      <Link
                        href={`/admin/users/${u._id}`}
                        className="text-muted hover:text-[#C63A07] transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/users/${u._id}/edit`}
                        className="text-muted hover:text-[#C63A07] transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setTarget(u)}
                        className="text-muted hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setQuery({ page: page - 1 })}
            className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setQuery({ page: page + 1 })}
            className="h-9 border border-hairline px-3 text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark disabled:opacity-40 rounded"
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Delete user"
      >
        <p className="mb-6 text-sm text-body">
          Delete{" "}
          <span className="font-bold text-on-dark">
            {target?.firstName} {target?.lastName}
          </span>
          ? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setTarget(null)}
            className="h-10 border border-hairline px-4 text-xs font-bold uppercase tracking-[1.5px] text-body transition-colors hover:text-on-dark rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isPending}
            className="h-10 bg-[#C63A07] px-4 text-xs font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-90 disabled:opacity-50 rounded"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
