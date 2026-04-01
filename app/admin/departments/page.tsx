import { prisma } from "@/lib/prisma";

export default async function DepartmentsPage() {
  const data = await prisma.department.findMany({ include: { faculty: true } });
  return <pre className="overflow-auto rounded border p-4 text-xs">{JSON.stringify(data, null, 2)}</pre>;
}
