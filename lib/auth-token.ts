import crypto from "crypto";

type AuthPayload = {
  id: number;
  role: number;
};

const SECRET = process.env.AUTH_SECRET || "dev-secret";

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  return Buffer.from(padded, "base64").toString("utf8");
}

function sign(payload: string) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createAuthToken(data: AuthPayload) {
  const payload = base64UrlEncode(JSON.stringify(data));
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function parseAuthToken(token?: string | null): AuthPayload | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected),
  );
  if (!isValid) return null;

  try {
    const decoded = base64UrlDecode(payload);
    return JSON.parse(decoded) as AuthPayload;
  } catch {
    return null;
  }
}
