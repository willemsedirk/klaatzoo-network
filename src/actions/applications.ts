"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifyNewApplication } from "@/lib/discord";
import { uploadFile } from "@/lib/upload";
import { applicationQuestions } from "@/config/questions";

export async function submitApplication(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to apply" };
  }

  // Check if user already has a pending/under-review application
  const existing = await db.application.findFirst({
    where: {
      userId: session.user.id,
      status: { in: ["PENDING", "UNDER_REVIEW"] },
    },
  });

  if (existing) {
    return { error: "You already have an active application. Please wait for a response." };
  }

  // Process answers from form data
  const answers: Record<string, string | string[]> = {};

  for (const question of applicationQuestions) {
    if (question.type === "image_upload") {
      // Handle file uploads
      const files = formData.getAll(question.id) as File[];
      const validFiles = files.filter((f) => f.size > 0);

      if (question.required && validFiles.length === 0) {
        return { error: `Please upload at least one image for: ${question.label}` };
      }

      const uploadedUrls: string[] = [];
      for (const file of validFiles) {
        try {
          const result = await uploadFile(file);
          uploadedUrls.push(result.url);
        } catch (err) {
          return { error: `Upload failed: ${(err as Error).message}` };
        }
      }
      answers[question.id] = uploadedUrls;
    } else {
      const value = formData.get(question.id) as string;

      if (question.required && (!value || value.trim().length === 0)) {
        return { error: `Please answer: ${question.label}` };
      }

      if (value) {
        if (question.maxLength && value.length > question.maxLength) {
          return { error: `Answer too long for: ${question.label}` };
        }
        answers[question.id] = value.trim();
      }
    }
  }

  // Save to database
  const application = await db.application.create({
    data: {
      userId: session.user.id,
      answers,
      status: "PENDING",
    },
  });

  // Send Discord notification
  await notifyNewApplication({
    username: session.user.name || "Unknown",
    email: session.user.email || "Unknown",
    applicationId: application.id,
    answers,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  });

  return { success: true, applicationId: application.id };
}

export async function checkApplicationExists(minecraftUsername: string) {
  // Prisma JSON filtering for PostgreSQL
  const existing = await db.application.findFirst({
    where: {
      answers: {
        path: ["minecraft_username"],
        equals: minecraftUsername,
      },
      status: { in: ["PENDING", "UNDER_REVIEW", "ACCEPTED"] },
    },
  });

  return { exists: !!existing };
}
