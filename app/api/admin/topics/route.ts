import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.topic.findMany());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await prisma.topic.create({ data: body }));
}
