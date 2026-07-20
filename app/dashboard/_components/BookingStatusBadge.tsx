export type BookingStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800",
};

export default function BookingStatusBadge({
  status,
}: {
  status: BookingStatus | string;
}) {
  const normalizedStatus = (status?.toLowerCase() || "pending") as BookingStatus;
  const style =
    statusStyles[normalizedStatus] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-[1px] rounded-full ${style}`}
    >
      {normalizedStatus}
    </span>
  );
}
