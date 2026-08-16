import { createServerFn } from "@tanstack/react-start";

/**
 * Upload an image to Cloudinary via the REST API.
 * Accepts a base64 data-URI string and a target folder name.
 * Returns the secure URL of the uploaded image.
 */
export const uploadToCloudinary = createServerFn({ method: "POST" })
  .validator((data: { file: string; folder?: string }) => data)
  .handler(async ({ data }) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary credentials are not configured");
    }

    // Generate signature for authenticated upload
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = data.folder || "dis-dev-cms";

    // Build params to sign (sorted alphabetically)
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

    // Use Web Crypto API for SHA-1 signature
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(paramsToSign);
    const hashBuffer = await crypto.subtle.digest("SHA-1", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Cloudinary] Upload failed:", errorText);
      throw new Error("Image upload failed");
    }

    const result = (await response.json()) as { secure_url: string };
    return { url: result.secure_url };
  });
