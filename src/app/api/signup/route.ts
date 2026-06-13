import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const waitlistSetKey = "livlive:waitlist:emails";
const fallbackUpstashUrl = "https://nearby-ram-148216.upstash.io";
const fallbackUpstashToken =
  "gQAAAAAAAkL4AAIgcDI2ODlkOGRjZDA5MDQ0YmMzOTk4MzkyYmNiNTI0ODdjYg";

type UpstashResponse<T> = {
  result?: T;
  error?: string;
};

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return email.length <= 254 && emailPattern.test(email);
}

async function upstashCommand<T>(command: unknown[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL || fallbackUpstashUrl;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || fallbackUpstashToken;

  if (!url || !token) return null;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const data = (await response.json().catch(() => null)) as UpstashResponse<T> | null;

  if (!response.ok || data?.error) {
    throw new Error(data?.error ?? "Unable to save signup.");
  }

  return data?.result;
}

async function storeInUpstash(email: string, createdAt: string) {
  const added = await upstashCommand<number>(["SADD", waitlistSetKey, email]);

  if (added === null) return false;

  if (added === 0) {
    return true;
  }

  await upstashCommand([
    "HSET",
    `livlive:waitlist:signup:${email}`,
    "email",
    email,
    "createdAt",
    createdAt,
    "source",
    "landing_page",
  ]);

  await upstashCommand(["LPUSH", "livlive:waitlist:recent", JSON.stringify({ email, createdAt })]);
  await upstashCommand(["LTRIM", "livlive:waitlist:recent", 0, 499]);

  return true;
}

async function storeLocally(email: string, createdAt: string) {
  const row = JSON.stringify({
    email,
    createdAt,
    source: "landing_page",
  });
  const dir = path.join("/tmp", "livlive");

  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "email-list.jsonl"), `${row}\n`, "utf8");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = normalizeEmail(body?.email);

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Enter a valid email." },
      { status: 400 },
    );
  }

  const createdAt = new Date().toISOString();

  try {
    const storedRemotely = await storeInUpstash(email, createdAt);

    if (!storedRemotely) {
      await storeLocally(email, createdAt);
    }
  } catch (error) {
    console.error("Signup storage failed", error);
    return NextResponse.json(
      { message: "Could not save your email. Try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "You are on the list." });
}
