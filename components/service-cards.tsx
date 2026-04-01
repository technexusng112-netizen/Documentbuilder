import Link from "next/link";

const services = [
  ["Project Research Write-Up", "Comprehensive, methodologically sound project writing support from proposal to final chapter."],
  ["Seminar Writing", "Well-structured seminar papers tailored to your department's academic format."],
  ["Technical Report Writing", "Industry-style technical reports with clear analysis, visuals, and references."],
  ["Data Collection and Analysis", "Online and offline data collection with statistical analysis and interpretation."],
  ["Project Correction and Editing", "Rigorous proofreading, formatting, and content enhancement for academic quality."],
  ["PowerPoint Presentation Design", "Professional slide decks for defense and seminar presentations."]
] as const;

export function ServiceCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map(([title, desc]) => (
        <article key={title} className="rounded-xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
          <Link href="/hire" className="mt-4 inline-block text-sm font-medium text-brand-700">
            Hire Us →
          </Link>
        </article>
      ))}
    </section>
  );
}
