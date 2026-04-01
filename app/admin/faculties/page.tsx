import { prisma } from "@/lib/prisma";

export default async function FacultiesPage() {
  const data = await prisma.faculty.findMany({ include: { departments: true, university: true } });
  return <pre className="overflow-auto rounded border p-4 text-xs">{JSON.stringify(data, null, 2)}</pre>;
}
