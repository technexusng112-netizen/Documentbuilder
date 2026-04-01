import Link from "next/link";

const links = [
  ["Dashboard Stats", "/admin/inquiries"],
  ["Universities", "/admin/universities"],
  ["Faculties", "/admin/faculties"],
  ["Departments", "/admin/departments"],
  ["Topics", "/admin/topics"]
] as const;

export default function AdminHome() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {links.map(([title, href]) => (
          <Link key={href} href={href} className="rounded border p-4 hover:bg-slate-50 dark:hover:bg-slate-900">
            {title}
          </Link>
        ))}
      </div>
    </section>
  );
}
