import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [universities, departments, topics, inquiries] = await Promise.all([
    prisma.university.count(),
    prisma.department.count(),
    prisma.topic.count(),
    prisma.contactMessage.count()
  ]);
  return NextResponse.json({ universities, departments, topics, inquiries });
}
