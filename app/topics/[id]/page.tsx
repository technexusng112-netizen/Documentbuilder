import { prisma } from "@/lib/prisma";

export default async function TopicDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = await prisma.topic.findUnique({
    where: { id },
    include: { university: true, faculty: true, department: true, category: true }
  });
  if (!topic) return <p>Topic not found.</p>;

  const recommendations = await prisma.topic.findMany({
    where: {
      id: { not: id },
      OR: [{ departmentId: topic.departmentId }, { categoryId: topic.categoryId }, { level: topic.level }]
    },
    take: 4
  });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{topic.title}</h1>
      <p>{topic.abstract}</p>
      <p className="text-sm">{topic.university.name} · {topic.faculty.name} · {topic.department.name}</p>
      <h2 className="text-xl font-semibold">Similar Topics</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {recommendations.map((r) => <div key={r.id} className="rounded border p-3">{r.title}</div>)}
      </div>
    </section>
  );
}
