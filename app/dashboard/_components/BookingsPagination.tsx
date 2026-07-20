"use client";

import Link from "next/link";

export default function BookingsPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-between text-sm text-muted">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link
            href={`/dashboard/bookings?page=${page - 1}`}
            className="h-9 border border-hairline px-3 flex items-center text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded"
          >
            Prev
          </Link>
        ) : (
          <span className="h-9 border border-hairline px-3 flex items-center text-xs uppercase tracking-[1px] text-body opacity-40 rounded">
            Prev
          </span>
        )}
        {page < totalPages ? (
          <Link
            href={`/dashboard/bookings?page=${page + 1}`}
            className="h-9 border border-hairline px-3 flex items-center text-xs uppercase tracking-[1px] text-body transition-colors hover:border-[#C63A07] hover:text-on-dark rounded"
          >
            Next
          </Link>
        ) : (
          <span className="h-9 border border-hairline px-3 flex items-center text-xs uppercase tracking-[1px] text-body opacity-40 rounded">
            Next
          </span>
        )}
      </div>
    </div>
  );
}
