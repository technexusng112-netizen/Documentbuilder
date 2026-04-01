import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ServiceCards } from "@/components/service-cards";

export default async function HomePage() {
  const [featuredTopics, departments] = await Promise.all([
    prisma.topic.findMany({ take: 4, orderBy: { createdAt: "desc" }, include: { department: true, university: true } }),
    prisma.department.findMany({ take: 6, orderBy: { topics: { _count: "desc" } } })
  ]);

  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-blue-500 p-10 text-white">
        <p className="mb-2 text-sm uppercase tracking-widest">Research smarter in Nigeria</p>
        <h1 className="max-w-2xl text-4xl font-bold">Discover realistic project topics by university, faculty, department, and level.</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/topics" className="rounded-lg bg-white px-4 py-2 font-medium text-brand-700">Explore Topics</Link>
          <Link href="/hire" className="rounded-lg border border-white px-4 py-2">Hire Experts</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured Departments</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {departments.map((d) => (
            <div key={d.id} className="rounded-lg border p-4">{d.name}</div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured Topics</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {featuredTopics.map((topic) => (
            <article key={topic.id} className="rounded-lg border p-5">
              <h3 className="font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{topic.abstract}</p>
              <p className="mt-3 text-xs">{topic.department.name} · {topic.university.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Academic Support Services</h2>
        <ServiceCards />
      </section>
    </div>
  );
}
