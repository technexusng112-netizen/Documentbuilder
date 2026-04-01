import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as { topicId: string };
  await prisma.bookmark.upsert({
    where: { userId_topicId: { userId: session.user.id, topicId: body.topicId } },
    create: { userId: session.user.id, topicId: body.topicId },
    update: {}
  });
  return NextResponse.json({ ok: true });
}
