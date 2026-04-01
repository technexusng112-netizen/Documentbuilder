import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return <p>Please sign in.</p>;

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: { topic: true }
  });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <h2 className="text-xl font-semibold">Saved Topics</h2>
      {bookmarks.length === 0 ? <p>No bookmarks yet.</p> : bookmarks.map((b) => <div key={b.id} className="rounded border p-3">{b.topic.title}</div>)}
    </section>
  );
}
