"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { statusUpdateSchema, applicationNoteSchema } from "@/lib/validations";
import { notifyStatusChange } from "@/lib/discord";

/**
 * Update an application's status (MODERATOR/ADMIN only).
 */
export async function updateApplicationStatus(
  applicationId: string,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const role = (session.user as { role: string }).role;
  if (role !== "MODERATOR" && role !== "ADMIN") {
    return { error: "Insufficient permissions" };
  }

  const parsed = statusUpdateSchema.safeParse({
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  const application = await db.application.update({
    where: { id: applicationId },
    data: { status: parsed.data.status },
    include: { user: true },
  });

  // Notify Discord about status change
  await notifyStatusChange({
    applicationId,
    username: application.user.username,
    newStatus: parsed.data.status,
    moderatorName: session.user.name || "Staff",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  });

  return { success: true };
}

/**
 * Add an internal note to an application (MODERATOR/ADMIN only).
 */
export async function addApplicationNote(
  applicationId: string,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const role = (session.user as { role: string }).role;
  if (role !== "MODERATOR" && role !== "ADMIN") {
    return { error: "Insufficient permissions" };
  }

  const parsed = applicationNoteSchema.safeParse({
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  await db.applicationNote.create({
    data: {
      applicationId,
      authorId: session.user.id,
      content: parsed.data.content,
    },
  });

  return { success: true };
}
