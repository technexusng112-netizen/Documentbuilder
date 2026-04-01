import { prisma } from "@/lib/prisma";

export default async function UniversitiesPage() {
  const data = await prisma.university.findMany({ include: { faculties: true } });
  return <pre className="overflow-auto rounded border p-4 text-xs">{JSON.stringify(data, null, 2)}</pre>;
}
