import { Metadata } from "next";
import { db } from "@/lib/db";
import { PageShell } from "@/components/layout/PageShell";
import { BuildsGallery } from "@/components/builds/BuildsGallery";

export const metadata: Metadata = {
  title: "Builds",
  description: "Explore amazing builds from the Klaatzoo Network community.",
};

export default async function BuildsPage() {
  let builds: Array<{
    id: string;
    title: string;
    description: string;
    author: string;
    imageUrls: unknown;
    category: string;
    featured: boolean;
  }> = [];

  try {
    builds = await db.build.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    // DB not available yet — show empty state
  }

  return (
    <PageShell>
      <section className="pt-12 pb-8 scroll-reveal">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
          Community Builds
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          Explore incredible creations from our talented community.
        </p>
      </section>

      {builds.length > 0 ? (
        <BuildsGallery builds={builds} />
      ) : (
        <section className="py-20 text-center scroll-reveal">
          <div className="text-6xl mb-6">🏗️</div>
          <h2 className="font-display font-semibold text-2xl text-[var(--color-text-primary)] mb-3">
            No Builds Yet
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            Builds will appear here once the database is connected and seeded. Run the seed script to populate demo data.
          </p>
        </section>
      )}
    </PageShell>
  );
}
