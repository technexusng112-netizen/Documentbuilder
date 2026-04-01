import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  department: z.string().min(2),
  level: z.enum(["UNDERGRADUATE", "POSTGRADUATE"]),
  message: z.string().min(5),
  serviceType: z.string().min(2)
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  await prisma.serviceRequest.create({ data: parsed.data });
  return NextResponse.json({ ok: true });
}
