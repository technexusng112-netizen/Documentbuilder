import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const topic = await prisma.topic.findUnique({
    where: { id },
    include: { university: true, faculty: true, department: true, category: true }
  });
  if (!topic) return new Response("Not found", { status: 404 });

  const content = `ProjectHelper Topic Summary\n\nTitle: ${topic.title}\n\nAbstract: ${topic.abstract}\n\nUniversity: ${topic.university.name}\nFaculty: ${topic.faculty.name}\nDepartment: ${topic.department.name}\nLevel: ${topic.level}\nCategory: ${topic.category.name}\nTags: ${topic.tags.join(", ")}`;

  return new Response(content, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=topic-${id}.pdf`
    }
  });
}
