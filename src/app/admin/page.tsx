import Link from "next/link";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default async function AdminPage() {
  let applications: Array<{
    id: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user: { username: string; email: string };
  }> = [];

  let stats = { total: 0, pending: 0, review: 0, accepted: 0, rejected: 0 };

  try {
    applications = await db.application.findMany({
      include: { user: { select: { username: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    stats = {
      total: applications.length,
      pending: applications.filter((a) => a.status === "PENDING").length,
      review: applications.filter((a) => a.status === "UNDER_REVIEW").length,
      accepted: applications.filter((a) => a.status === "ACCEPTED").length,
      rejected: applications.filter((a) => a.status === "REJECTED").length,
    };
  } catch {
    // DB not connected
  }

  const statCards = [
    { label: "Total", value: stats.total, color: "var(--color-text-primary)", accent: "green" as const },
    { label: "Pending", value: stats.pending, color: "var(--color-mc-yellow)", accent: "yellow" as const },
    { label: "Under Review", value: stats.review, color: "var(--color-mc-blue)", accent: "blue" as const },
    { label: "Accepted", value: stats.accepted, color: "var(--color-mc-green)", accent: "green" as const },
    { label: "Rejected", value: stats.rejected, color: "var(--color-mc-red)", accent: "red" as const },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {statCards.map((s) => (
          <Card key={s.label} accent={s.accent} padding="md">
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{s.label}</p>
            <p className="font-display font-bold text-3xl mt-1" style={{ color: s.color }}>
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Applications table */}
      <Card padding="sm">
        <div className="px-4 py-3 border-b border-[var(--color-border-light)]">
          <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)]">
            Applications
          </h3>
        </div>

        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-light)]">
                  <th className="text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">Applicant</th>
                  <th className="text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">Submitted</th>
                  <th className="text-right text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-light)]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[var(--color-bg-elevated)] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{app.user.username}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{app.user.email}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{formatDate(app.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="text-sm font-medium text-[var(--color-mc-blue)] hover:underline"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-[var(--color-text-secondary)]">No applications yet.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
