import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = await prisma.topic.findUnique({ where: { id } });
  if (!topic) return NextResponse.json({ items: [] });

  const items = await prisma.topic.findMany({
    where: {
      id: { not: id },
      OR: [
        { departmentId: topic.departmentId },
        { categoryId: topic.categoryId },
        { level: topic.level },
        { tags: { hasSome: topic.tags.slice(0, 3) } }
      ]
    },
    take: 5
  });

  return NextResponse.json({ items });
}
