"use client";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

// segment -> page title; falls back to the raw segment
const TITLES: Record<string, string> = {
  admin: "Overview",
  users: "Users",
  blogs: "Blogs",
  create: "Create",
  edit: "Edit",
};

export default function Header() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean); // e.g. ["admin","users","123"]
  const last = segments[segments.length - 1] ?? "admin";
  const title = TITLES[last] ?? last;

  return (
    <header className="flex h-16 items-center justify-between border-b border-hairline bg-surface-soft px-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <img
            src="/images/logo.png"
            alt="Sajilo Stay"
            className="h-8 w-auto"
          />
        </Link>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-muted">
            {segments.join(" / ")}
          </p>
          <h1 className="text-lg font-bold leading-none text-on-dark">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-muted sm:inline">
          {user?.username || user?.email || "Unknown user"}
        </span>
        <button
          onClick={logout}
          className="rounded-md border border-hairline px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-muted hover:text-on-dark"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
