import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ApplicationDetailClient from "./ApplicationDetailClient";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await db.application.findUnique({
    where: { id },
    include: {
      user: { select: { username: true, email: true } },
      notes: {
        include: { author: { select: { username: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!application) notFound();

  // Serialize dates for client component
  const serialized = {
    ...application,
    answers: application.answers as Record<string, string | string[]>,
    createdAt: application.createdAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
    notes: application.notes.map((n: any) => ({
      ...n,
      createdAt: n.createdAt.toISOString(),
    })),
  };

  return <ApplicationDetailClient application={serialized} />;
}
