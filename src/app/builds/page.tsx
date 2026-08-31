import { Metadata } from "next";
import { db } from "@/lib/db";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Builds",
  description: "Explore amazing builds from the Klaatzoo Network community.",
};

const categoryColors: Record<string, string> = {
  Survival: "var(--color-mc-green)",
  Creative: "var(--color-mc-blue)",
  Redstone: "var(--color-mc-red)",
  Megabuild: "var(--color-mc-purple)",
  Landscape: "var(--color-mc-yellow)",
  Medieval: "var(--color-mc-green)",
  Modern: "var(--color-mc-blue)",
  Fantasy: "var(--color-mc-purple)",
};

const categoryAccents: Record<string, "green" | "blue" | "red" | "purple" | "yellow"> = {
  Survival: "green",
  Creative: "blue",
  Redstone: "red",
  Megabuild: "purple",
  Landscape: "yellow",
  Medieval: "green",
  Modern: "blue",
  Fantasy: "purple",
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

  const categories = ["All", ...Array.from(new Set(builds.map((b) => b.category)))];

  return (
    <PageShell>
      {/* Header */}
      <section className="pt-12 pb-8 scroll-reveal">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
          Community Builds
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          Explore incredible creations from our talented community. From cozy survival bases to jaw-dropping megastructures.
        </p>
      </section>

      {/* Category filters */}
      <section className="pb-8 scroll-reveal">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 text-sm font-medium rounded-[var(--radius-full)] cursor-pointer transition-all duration-200 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-mc-green)] hover:text-[var(--color-mc-green)]"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Builds grid */}
      {builds.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 stagger-children scroll-reveal">
          {builds.map((build) => {
            const images = (build.imageUrls as string[]) || [];
            return (
              <Card
                key={build.id}
                accent={categoryAccents[build.category] || "green"}
                hover
                padding="sm"
                className="overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-video bg-[var(--color-bg-secondary)] rounded-t-[var(--radius-lg)] overflow-hidden mb-4">
                  {images[0] ? (
                    <img
                      src={images[0]}
                      alt={build.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
                      🏗️
                    </div>
                  )}
                  {build.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="special" size="sm">⭐ Featured</Badge>
                    </div>
                  )}
                </div>

                <div className="px-2 pb-2">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)] line-clamp-1">
                      {build.title}
                    </h3>
                    <Badge
                      variant="default"
                      size="sm"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-1.5"
                        style={{ backgroundColor: categoryColors[build.category] || "var(--color-mc-green)" }}
                      />
                      {build.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                    {build.description}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Built by <span className="font-medium text-[var(--color-text-primary)]">{build.author}</span>
                  </p>
                </div>
              </Card>
            );
          })}
        </section>
      ) : (
        /* Empty state */
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
