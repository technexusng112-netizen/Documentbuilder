import { TopicExplorer } from "@/components/topic-explorer";

export default function TopicsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Topics Explorer</h1>
      <p className="text-slate-600 dark:text-slate-300">Filter by university context, department, level, and category to find suitable project ideas.</p>
      <TopicExplorer />
    </section>
  );
}
