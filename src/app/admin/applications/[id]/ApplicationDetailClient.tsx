"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateApplicationStatus, addApplicationNote } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/FormControls";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDateTime, titleCase } from "@/lib/utils";
import { applicationQuestions } from "@/config/questions";

interface ApplicationDetailClientProps {
  application: {
    id: string;
    status: string;
    answers: Record<string, string | string[]>;
    createdAt: string;
    updatedAt: string;
    user: { username: string; email: string };
    notes: Array<{
      id: string;
      content: string;
      createdAt: string;
      author: { username: string };
    }>;
  };
}

export default function ApplicationDetailClient({ application }: ApplicationDetailClientProps) {
  const router = useRouter();
  const [statusLoading, setStatusLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  async function handleStatusChange(status: string) {
    setStatusLoading(true);
    const formData = new FormData();
    formData.set("status", status);
    await updateApplicationStatus(application.id, formData);
    setStatusLoading(false);
    router.refresh();
  }

  async function handleAddNote() {
    if (!noteContent.trim()) return;
    setNoteLoading(true);
    const formData = new FormData();
    formData.set("content", noteContent);
    await addApplicationNote(application.id, formData);
    setNoteContent("");
    setNoteLoading(false);
    router.refresh();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => router.push("/admin")}
            className="text-sm text-[var(--color-mc-blue)] hover:underline mb-2 inline-block"
          >
            ← Back to Applications
          </button>
          <h1 className="font-display font-bold text-2xl text-[var(--color-text-primary)]">
            {application.user.username}&apos;s Application
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            {application.user.email} • Submitted {formatDateTime(application.createdAt)}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      {/* Status controls */}
      <Card padding="md" accent="purple">
        <h3 className="font-display font-semibold text-sm text-[var(--color-text-primary)] mb-3">
          Update Status
        </h3>
        <div className="flex flex-wrap gap-2">
          {["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED"].map((status) => (
            <Button
              key={status}
              size="sm"
              variant={
                status === "ACCEPTED" ? "primary" :
                status === "REJECTED" ? "danger" :
                status === "UNDER_REVIEW" ? "secondary" : "outline"
              }
              disabled={application.status === status || statusLoading}
              onClick={() => handleStatusChange(status)}
              loading={statusLoading}
            >
              {titleCase(status)}
            </Button>
          ))}
        </div>
      </Card>

      {/* Answers */}
      <Card padding="lg">
        <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)] mb-6">
          Application Answers
        </h3>
        <div className="space-y-6">
          {applicationQuestions.map((q) => {
            const answer = application.answers[q.id];
            if (!answer) return null;

            return (
              <div key={q.id} className="border-b border-[var(--color-border-light)] pb-5 last:border-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  {q.label}
                </p>
                {q.type === "image_upload" && Array.isArray(answer) ? (
                  <div className="flex gap-3 flex-wrap">
                    {(answer as string[]).map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-32 h-32 rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                      >
                        <img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">
                    {String(answer)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Staff Notes */}
      <Card padding="lg" accent="blue">
        <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)] mb-4">
          📝 Staff Notes
        </h3>

        {/* Existing notes */}
        {application.notes.length > 0 && (
          <div className="space-y-3 mb-6">
            {application.notes.map((note) => (
              <div
                key={note.id}
                className="p-3 bg-[var(--color-bg-elevated)] rounded-[var(--radius-md)] border border-[var(--color-border-light)]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-[var(--color-mc-blue)]">
                    {note.author.username}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {formatDateTime(note.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{note.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add note form */}
        <div className="space-y-3">
          <Textarea
            id="note"
            placeholder="Add an internal note..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={3}
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={handleAddNote}
            loading={noteLoading}
            disabled={!noteContent.trim()}
          >
            Add Note
          </Button>
        </div>
      </Card>
    </div>
  );
}
