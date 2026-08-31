import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = (session.user as { role?: string }).role;
  if (role !== "MODERATOR" && role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      {/* Admin header bar */}
      <div className="bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)] pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--color-mc-purple)] rounded-[var(--radius-md)] flex items-center justify-center text-white text-sm font-bold">
                ⚡
              </div>
              <div>
                <h2 className="font-display font-bold text-lg">Staff Panel</h2>
                <p className="text-xs text-[var(--color-text-on-dark-muted)]">
                  Signed in as {session.user.name} ({role})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
