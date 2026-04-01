import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  const { id } = await params;
  return NextResponse.json(await prisma.faculty.update({ where: { id }, data: body }));
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.faculty.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
