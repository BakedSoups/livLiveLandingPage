import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email." },
      { status: 400 },
    );
  }

  const row = JSON.stringify({
    email,
    createdAt: new Date().toISOString(),
  });
  const dir = path.join("/tmp", "livlive");

  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "email-list.jsonl"), `${row}\n`, "utf8");

  return NextResponse.json({ message: "You are on the list." });
}
