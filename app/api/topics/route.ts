import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "";
  const level = searchParams.get("level") ?? "";
  const category = searchParams.get("category") ?? "";

  const items = await prisma.topic.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { abstract: { contains: q, mode: "insensitive" } },
                { tags: { hasSome: [q.toLowerCase()] } }
              ]
            }
          : {},
        department ? { department: { name: { contains: department, mode: "insensitive" } } } : {},
        level ? { level: level as "UNDERGRADUATE" | "POSTGRADUATE" } : {},
        category ? { category: { name: { contains: category, mode: "insensitive" } } } : {}
      ]
    },
    include: { university: true, faculty: true, department: true, category: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return NextResponse.json({
    items: items.map((t) => ({
      id: t.id,
      title: t.title,
      abstract: t.abstract,
      level: t.level,
      tags: t.tags,
      category: t.category.name,
      university: t.university.name,
      faculty: t.faculty.name,
      department: t.department.name,
      createdAt: t.createdAt
    }))
  });
}
