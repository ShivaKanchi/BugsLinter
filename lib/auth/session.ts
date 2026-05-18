import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const sessionCookieName = "bugslinter_session";
const sessionTtlMs = 1000 * 60 * 60 * 24 * 7;
const sessionSecret = process.env.SESSION_SECRET ?? "bugslinter-local-session-secret";

export type AppSession = {
  tenantId: string;
  userId: string;
};

function sign(value: string) {
  return createHmac("sha256", sessionSecret).update(value).digest("hex");
}

function encodeSession(session: AppSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSession(rawValue: string): AppSession | null {
  const [payload, signature] = rawValue.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = sign(payload);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AppSession;

    if (!parsed.tenantId || !parsed.userId) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(sessionCookieName)?.value;

  if (!rawValue) {
    return null;
  }

  return decodeSession(rawValue);
}

export async function setSession(session: AppSession) {
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + sessionTtlMs),
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}
