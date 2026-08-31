import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = (Number(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024;

export interface UploadResult {
  url: string;
  filename: string;
}

/**
 * Validates and saves an uploaded file.
 * Dev: saves to local disk (public/uploads/)
 * Prod: would use S3-compatible storage (extend this function)
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }

  // Generate a safe, unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const filename = `${uuidv4()}.${ext}`;

  // Save to local disk (dev mode)
  const uploadDir = process.env.UPLOAD_DIR || "./public/uploads";
  const absoluteDir = path.resolve(uploadDir);

  await mkdir(absoluteDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(absoluteDir, filename);

  await writeFile(filePath, buffer);

  // Return the public URL
  const url = `/uploads/${filename}`;

  return { url, filename };
}

/**
 * Validates a file without saving it (for client-side preview validation).
 */
export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Invalid file type. Allowed: JPG, PNG, WebP, GIF`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`;
  }
  return null;
}
