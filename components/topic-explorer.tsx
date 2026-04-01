"use client";

import { useEffect, useState } from "react";
import type { TopicDto } from "@/types/topic";

export function TopicExplorer() {
  const [topics, setTopics] = useState<TopicDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const params = new URLSearchParams({ q, level, department, category });
      const res = await fetch(`/api/topics?${params.toString()}`);
      const data = (await res.json()) as { items: TopicDto[] };
      setTopics(data.items);
      setLoading(false);
    };
    run();
  }, [q, level, department, category]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by keyword" className="rounded-lg border p-2" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="rounded-lg border p-2" />
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border p-2">
          <option value="">All Levels</option>
          <option value="UNDERGRADUATE">Undergraduate</option>
          <option value="POSTGRADUATE">Postgraduate</option>
        </select>
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="rounded-lg border p-2" />
      </div>
      {loading && <p>Loading topics...</p>}
      {!loading && topics.length === 0 && <p className="rounded-lg border border-dashed p-6 text-center">No topics found. Try adjusting your filters.</p>}
      <div className="grid gap-3 md:grid-cols-2">
        {topics.map((topic) => (
          <article key={topic.id} className="rounded-lg border p-4">
            <h3 className="font-semibold">{topic.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{topic.abstract}</p>
            <p className="mt-2 text-xs">{topic.department} · {topic.level} · {topic.category}</p>
            <a href={`/api/export-topic?id=${topic.id}`} className="mt-3 inline-block text-sm text-brand-700">Download PDF</a>
          </article>
        ))}
      </div>
    </div>
  );
}
