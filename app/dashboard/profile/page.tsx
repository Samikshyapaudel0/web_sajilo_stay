
import { handleUserDetails } from "@/lib/actions/auth_action";
import UpdateForm from "../_components/UpdateForm";

export default async function Page() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold uppercase leading-none text-on-dark md:text-5xl">
          Update Profile
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        <UpdateForm user={userDetails.data} />
      </div>
    </div>
  );
}