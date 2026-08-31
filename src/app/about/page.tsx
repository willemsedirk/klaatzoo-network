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
              📖 Our Story
            </h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                Klaatzoo Network was born in the summer of 2022, when a small group of friends decided they wanted something more than just another vanilla SMP. They wanted a server that felt like <strong className="text-[var(--color-text-primary)]">home</strong> — a place where creativity thrives, friendships form naturally, and every player&apos;s contribution matters.
              </p>
              <p>
                What started as a 10-player whitelist quickly grew into a thriving community of builders, redstoners, explorers, and storytellers. We&apos;ve survived world resets (only one — we learned our lesson), server migrations, and countless creeper explosions, but through it all, one thing has stayed constant: our commitment to building a community where everyone belongs.
              </p>
              <p>
                Today, Klaatzoo is home to <strong className="text-[var(--color-text-primary)]">50+ active players</strong> across multiple time zones, with a world that&apos;s been continuously running for over 3 years. Every mountain, village, and redstone contraption tells a story — and we&apos;d love for you to add your chapter.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children scroll-reveal">
          {[
            { label: "Server IP", value: siteConfig.server.ip, color: "var(--color-mc-green)", accent: "green" as const, mono: true },
            { label: "Version", value: siteConfig.server.version, color: "var(--color-mc-blue)", accent: "blue" as const, mono: false },
            { label: "Platform", value: siteConfig.server.platform, color: "var(--color-mc-yellow)", accent: "yellow" as const, mono: false },
            { label: "Max Players", value: String(siteConfig.server.maxPlayers), color: "var(--color-mc-purple)", accent: "purple" as const, mono: false },
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

      {/* ── Staff Team ──────────────────────────────────── */}
      <section className="pb-20 scroll-reveal">
        <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-6">
          👥 Staff Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children scroll-reveal">
          {siteConfig.staff.map((member, i) => {
            const accents: Array<"green" | "blue" | "red" | "purple" | "yellow"> = ["green", "blue", "red", "purple", "yellow"];
            const colors = [
              "var(--color-mc-green)",
              "var(--color-mc-blue)",
              "var(--color-mc-red)",
              "var(--color-mc-purple)",
            ];

            return (
              <Card key={member.name} accent={accents[i % accents.length]} hover padding="md" className="text-center">
                {/* Avatar placeholder */}
                <div
                  className="w-20 h-20 rounded-[var(--radius-xl)] mx-auto mb-4 flex items-center justify-center text-white font-display font-bold text-2xl"
                  style={{ backgroundColor: colors[i % colors.length] }}
                >
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
                  {member.name}
                </h3>
                <p
                  className="text-xs font-medium mb-3"
                  style={{ color: colors[i % colors.length] }}
                >
                  {member.role}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {member.bio}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
