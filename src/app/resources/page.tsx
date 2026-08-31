import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, downloads, and links for Klaatzoo Network players.",
};

const iconMap: Record<string, string> = {
  rocket: "🚀",
  book: "📖",
  puzzle: "🧩",
  palette: "🎨",
  chat: "💬",
  globe: "🌐",
  map: "🗺️",
  download: "📥",
  shield: "🛡️",
};

const categoryAccents: Record<string, "green" | "blue" | "yellow" | "purple" | "red"> = {
  "Getting Started": "green",
  "Modifications": "blue",
  "Community": "purple",
};

const categoryColors: Record<string, string> = {
  "Getting Started": "var(--color-mc-green)",
  "Modifications": "var(--color-mc-blue)",
  "Community": "var(--color-mc-purple)",
};

export default function ResourcesPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="pt-12 pb-8 scroll-reveal">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
          Resources
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          Everything you need to get started and make the most of your Klaatzoo experience.
        </p>
      </section>

      {/* Resource categories */}
      <section className="pb-20 space-y-12">
        {siteConfig.resources.map((category) => (
          <div key={category.category} className="scroll-reveal">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: categoryColors[category.category] || "var(--color-mc-green)" }}
              />
              <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)]">
                {category.category}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children scroll-reveal">
              {category.items.map((item) => {
                const isExternal = "external" in item && item.external;
                const cardContent = (
                  <Card
                    accent={categoryAccents[category.category] || "green"}
                    hover
                    padding="md"
                    className="h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${categoryColors[category.category] || "var(--color-mc-green)"}15`,
                        }}
                      >
                        {iconMap[item.icon] || "📄"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-mc-green)] transition-colors">
                            {item.title}
                          </h3>
                          {isExternal && (
                            <svg className="w-3.5 h-3.5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );

                if (isExternal) {
                  return (
                    <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="block group">
                      {cardContent}
                    </a>
                  );
                }
                
                return (
                  <Link key={item.title} href={item.href} className="block group">
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* How to Join guide */}
      <section id="how-to-join" className="pb-20 scroll-reveal">
        <Card padding="lg" accent="green" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-mc-green)]/5 to-transparent rounded-full translate-x-20 -translate-y-20" />
          <div className="relative">
            <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-6">
              🚀 How to Join
            </h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Apply", desc: "Fill out our application form — it takes just a few minutes.", color: "var(--color-mc-green)" },
                { step: "2", title: "Wait for Review", desc: "Our staff will review your application within 24-48 hours.", color: "var(--color-mc-blue)" },
                { step: "3", title: "Get Accepted", desc: "You'll receive a notification on Discord when you're accepted.", color: "var(--color-mc-yellow)" },
                { step: "4", title: "Connect & Play", desc: `Launch Minecraft ${siteConfig.server.version}, add our server IP, and join the fun!`, color: "var(--color-mc-purple)" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
