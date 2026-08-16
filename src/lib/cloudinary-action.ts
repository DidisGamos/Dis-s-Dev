import { createServerFn } from "@tanstack/react-start";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "ddawhqxg7";
const API_KEY = process.env.CLOUDINARY_API_KEY || "794227243569266";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "HHce8X5Sn9cowLoYbJBxdDsumZM";

/**
 * Generates a signed payload so the browser can upload directly to Cloudinary
 * or so the server can upload seamlessly.
 */
async function signCloudinaryParams(params: Record<string, string>): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  const serialized = sortedKeys.map((k) => `${k}=${params[k]}`).join("&") + API_SECRET;

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(serialized);
  const hashBuffer = await crypto.subtle.digest("SHA-1", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Server function to get upload signature for client-side direct upload
 */
export const getCloudinarySignature = createServerFn({ method: "POST" })
  .validator((data: { folder?: string }) => data)
  .handler(async ({ data }) => {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = data.folder || "dis-dev-cms/projects";
    const signature = await signCloudinaryParams({ folder, timestamp });

    return {
      cloudName: CLOUD_NAME,
      apiKey: API_KEY,
      timestamp,
      folder,
      signature,
    };
  });

/**
 * Server function to upload directly from server
 */
export const uploadToCloudinary = createServerFn({ method: "POST" })
  .validator((data: { file: string; folder?: string }) => data)
  .handler(async ({ data }) => {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = data.folder || "dis-dev-cms/projects";
    const signature = await signCloudinaryParams({ folder, timestamp });

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("api_key", API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Cloudinary Server Upload Error]", errorText);
      throw new Error(`Upload failed: ${errorText}`);
    }

    const result = (await response.json()) as { secure_url: string };
    return { url: result.secure_url };
  });
