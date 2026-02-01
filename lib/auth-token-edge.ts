type AuthPayload = {
  id: number;
  role: number;
};

const SECRET = (process.env.AUTH_SECRET || "dev-secret").trim();

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  return atob(padded);
}

function base64UrlToBytes(input: string) {
  const decoded = base64UrlDecode(input);
  return Uint8Array.from(decoded, (c) => c.charCodeAt(0));
}

async function verifySignature(payload: string, signature: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const signatureBytes = base64UrlToBytes(signature);

  return crypto.subtle.verify("HMAC", key, signatureBytes, enc.encode(payload));
}

export async function parseAuthToken(
  token?: string | null,
): Promise<AuthPayload | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const isValid = await verifySignature(payload, signature);
  if (!isValid) return null;

  try {
    const decoded = base64UrlDecode(payload);
    return JSON.parse(decoded) as AuthPayload;
  } catch {
    return null;
  }
}
