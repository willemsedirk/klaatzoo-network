import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Klaatzoo Network — our story, rules, staff, and server info.",
};

export default function AboutPage() {
  return (
    <PageShell>
      {/* ── Header ──────────────────────────────────────── */}
      <section className="pt-12 pb-8 scroll-reveal">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
          About Klaatzoo
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
          The story, rules, and people behind the network.
        </p>
      </section>

      {/* ── Our Story ───────────────────────────────────── */}
      <section className="pb-16 scroll-reveal">
        <Card padding="lg" accent="green" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-mc-green)]/5 to-transparent rounded-full translate-x-20 -translate-y-20" />
          <div className="relative">
            <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-4">
              What is the Klaatzoo Network?
            </h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                Our story began in late December of 2024, as a small group of freaks just wanting to satiate our hunger for the 2 week Minecraft phase. Since then, our little group has grown into a flourishing community full of creativity and teamwork from far and wide.
              </p>
              <h3 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-4">
                Which brings us to the present, 2026
              </h3>
              <p>
                Since the very beginning we’ve strived to keep to the traditional Minecraft roots, preferring to stay away from pay to win ranks, land claiming, teleporting, and all that nonsense. Our server is strictly vanilla plus only, only minor datapacks such as QoL features from Vanilla Tweaks are used on the network.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* ── Server Info ─────────────────────────────────── */}
      <section className="pb-16 scroll-reveal">
        <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-6">
          🖥️ Server Information
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 stagger-children scroll-reveal">
          {[
            { label: "Server IP", value: siteConfig.server.ip, color: "var(--color-mc-green)", accent: "green" as const, mono: true },
            { label: "Version", value: siteConfig.server.version, color: "var(--color-mc-blue)", accent: "blue" as const, mono: false },
            { label: "Platform", value: siteConfig.server.platform, color: "var(--color-mc-yellow)", accent: "yellow" as const, mono: false },
            { label: "Max Players", value: String(siteConfig.server.maxPlayers), color: "var(--color-mc-purple)", accent: "purple" as const, mono: false },
            { label: "Server Location", value: siteConfig.server.serverLocation, color: "var(--color-mc-green)", accent: "green" as const, mono: false },
            { label: "Restart Frequency", value: siteConfig.server.restartFrequency, color: "var(--color-mc-red)", accent: "red" as const, mono: false },
          ].map((info) => (
            <Card key={info.label} accent={info.accent} padding="md">
              <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                {info.label}
              </p>
              <p
                className={`text-lg font-semibold ${info.mono ? "font-mono" : "font-display"}`}
                style={{ color: info.color }}
              >
                {info.value}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Rules ───────────────────────────────────────── */}
      <section id="rules" className="pb-16 scroll-reveal">
        <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-6">
          📜 Server Rules
        </h2>
        <div className="space-y-3 stagger-children scroll-reveal">
          {siteConfig.rules.map((rule, index) => {
            const colors = [
              "var(--color-mc-red)",
              "var(--color-mc-green)",
              "var(--color-mc-blue)",
              "var(--color-mc-yellow)",
              "var(--color-mc-purple)",
            ];
            const color = colors[index % colors.length];

            return (
              <Card key={rule.title} padding="md" hover className="group">
                <div className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center font-display font-bold text-white text-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-1">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

    </PageShell>
  );
}
