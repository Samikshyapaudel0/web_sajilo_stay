import { getAllProperties } from "@/lib/api/host/property";
import PropertyTable from "./_components/PropertyTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
  const search = query.search ? (query.search as string) : "";

  const result = await getAllProperties({ page, limit, search });

  if (!result.success) {
    throw new Error("Failed to load properties");
  }

  return (
    <div>
      <PropertyTable
        data={result.data}
        pagination={result.pagination}
        search={search}
      />
    </div>
  );
}
