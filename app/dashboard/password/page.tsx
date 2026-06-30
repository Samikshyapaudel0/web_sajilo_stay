import Link from "next/link";
import UpdatePasswordForm from "../_components/PasswordResetForm";

export default function Page() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-muted">
          Security
        </p>
        <h1 className="text-4xl font-bold uppercase leading-none text-on-dark md:text-5xl">
          Update Password
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        <UpdatePasswordForm />
        <Link
          href="/dashboard/profile"
          className="mt-6 inline-block text-sm font-medium text-muted hover:text-on-dark"
        >
          ← Back to Profile
        </Link>
      </div>
    </div>
  );
}
