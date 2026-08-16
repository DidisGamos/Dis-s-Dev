import { createServerFn } from "@tanstack/react-start";

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "e9f1a8c3d7b542e68a1f0c4e7b923d5a16c84f0923e7b15a8d4c62f90a3b1e7c598d1a4e7f3b2c6085a1e9d7c4f2b053"
  );
}

function getExpectedPassword(): string {
  const envPass = process.env.ADMIN_PASSWORD;
  if (envPass) {
    return envPass.trim().replace(/^["']|["']$/g, "");
  }
  return "DissDev@2026@DissDev";
}

async function generateSignature(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(getSecretKey());
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(payload)
  );
  return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data === "string") return { password: data };
    if (data && typeof data === "object" && "password" in data) {
      return { password: String((data as { password: unknown }).password || "") };
    }
    return { password: "" };
  })
  .handler(async ({ data }) => {
    const input = (data?.password || "").trim();
    const expected = getExpectedPassword();

    // Strict exact match only
    if (!input || input !== expected) {
      console.warn("[AUTH ADMIN] Mot de passe refusé.");
      return { success: false, message: "Mot de passe incorrect" };
    }

    console.log("[AUTH ADMIN] Connexion réussie avec le mot de passe défini !");
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const payload = JSON.stringify({ auth: "admin", exp: expiresAt });
    const signature = await generateSignature(payload);
    const token = `${Buffer.from(payload).toString("base64")}.${signature}`;

    return { success: true, token, message: "Connexion réussie !" };
  });

export const verifyAdminSession = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data === "string") return { token: data };
    if (data && typeof data === "object" && "token" in data) {
      return { token: String((data as { token: unknown }).token || "") };
    }
    return { token: "" };
  })
  .handler(async ({ data }) => {
    if (!data?.token) return { valid: false };

    try {
      const [base64Payload, signature] = data.token.split(".");
      if (!base64Payload || !signature) return { valid: false };

      const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
      const expectedSignature = await generateSignature(payload);

      if (signature !== expectedSignature) return { valid: false };

      const parsed = JSON.parse(payload) as { auth: string; exp: number };
      if (parsed.auth !== "admin" || Date.now() > parsed.exp) {
        return { valid: false };
      }

      return { valid: true };
    } catch {
      return { valid: false };
    }
  });
