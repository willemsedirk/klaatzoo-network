import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your application status.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const applications = await db.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell>
      <section className="pt-12 pb-8 scroll-reveal">
        <h1 className="font-display font-bold text-4xl text-[var(--color-text-primary)] mb-2">
          Welcome, {session.user.name}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Track your application status here.
        </p>
      </section>

      {applications.length > 0 ? (
        <section className="pb-20 space-y-6">
          {applications.map((app) => {
            const statusTimeline = [
              { key: "PENDING", label: "Submitted", done: true },
              { key: "UNDER_REVIEW", label: "Under Review", done: app.status === "UNDER_REVIEW" || app.status === "ACCEPTED" || app.status === "REJECTED" },
              { key: "DECISION", label: app.status === "ACCEPTED" ? "Accepted" : app.status === "REJECTED" ? "Rejected" : "Decision", done: app.status === "ACCEPTED" || app.status === "REJECTED" },
            ];

            return (
              <Card key={app.id} padding="lg" accent={
                app.status === "ACCEPTED" ? "green" :
                app.status === "REJECTED" ? "red" :
                app.status === "UNDER_REVIEW" ? "blue" : "yellow"
              } className="scroll-reveal">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">
                      #{app.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Submitted {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-0 mb-4">
                  {statusTimeline.map((step, i) => (
                    <div key={step.key} className="flex items-center flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step.done
                          ? app.status === "REJECTED" && i === statusTimeline.length - 1
                            ? "bg-[var(--color-mc-red)] text-white"
                            : "bg-[var(--color-mc-green)] text-white"
                          : "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                      }`}>
                        {step.done ? "✓" : i + 1}
                      </div>
                      {i < statusTimeline.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 rounded-full ${
                          step.done ? "bg-[var(--color-mc-green)]" : "bg-[var(--color-border)]"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                  {statusTimeline.map((step) => (
                    <span key={step.key}>{step.label}</span>
                  ))}
                </div>

                {app.status === "ACCEPTED" && (
                  <div className="mt-6 p-4 bg-[var(--color-accent-light)] rounded-[var(--radius-md)] border border-[var(--color-mc-green)]/20">
                    <p className="text-sm text-[var(--color-mc-green)] font-medium">
                      🎉 Congratulations! You&apos;ve been accepted. Check Discord for next steps!
                    </p>
                  </div>
                )}

                {app.status === "REJECTED" && (
                  <div className="mt-6 p-4 bg-[var(--color-danger-light)] rounded-[var(--radius-md)] border border-[var(--color-mc-red)]/20">
                    <p className="text-sm text-[var(--color-mc-red)]">
                      Unfortunately, your application wasn&apos;t accepted this time. You can re-apply after 30 days.
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </section>
      ) : (
        <section className="pb-20 scroll-reveal">
          <Card padding="lg" className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="font-display font-semibold text-2xl text-[var(--color-text-primary)] mb-3">
              No Applications Yet
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
              You haven&apos;t submitted an application yet. Ready to join the Klaatzoo community?
            </p>
            <Link href="/apply">
              <Button size="lg">Start Your Application</Button>
            </Link>
          </Card>
        </section>
      )}
    </PageShell>
  );
}
