import { prisma } from "@/lib/prisma";

export default async function TopicsAdminPage() {
  const data = await prisma.topic.findMany({ include: { university: true, faculty: true, department: true, category: true } });
  return <pre className="overflow-auto rounded border p-4 text-xs">{JSON.stringify(data, null, 2)}</pre>;
}
