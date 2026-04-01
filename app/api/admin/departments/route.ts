import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.department.findMany());
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { name: string; facultyId: string };
  return NextResponse.json(await prisma.department.create({ data: body }));
}
