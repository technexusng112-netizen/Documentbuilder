import { prisma } from "@/lib/prisma";

export default async function InquiriesPage() {
  const [messages, requests, stats] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.serviceRequest.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.$transaction([
      prisma.university.count(),
      prisma.department.count(),
      prisma.topic.count(),
      prisma.contactMessage.count()
    ])
  ]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Stats</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Universities", stats[0]],
          ["Departments", stats[1]],
          ["Topics", stats[2]],
          ["Inquiries", stats[3]]
        ].map(([label, value]) => (
          <div key={label as string} className="rounded border p-3">
            <p className="text-xs text-slate-500">{label as string}</p>
            <p className="text-xl font-semibold">{value as number}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold">Recent Contact Messages</h2>
      <pre className="overflow-auto rounded border p-4 text-xs">{JSON.stringify(messages, null, 2)}</pre>
      <h2 className="text-xl font-semibold">Recent Service Requests</h2>
      <pre className="overflow-auto rounded border p-4 text-xs">{JSON.stringify(requests, null, 2)}</pre>
    </section>
  );
}
