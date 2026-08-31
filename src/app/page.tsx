import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const highlights = [
  {
    icon: "🏗️",
    title: "Epic Builds",
    description: "From humble cottages to sprawling cities, our builders push the limits of creativity every day.",
    accent: "green" as const,
    color: "var(--color-mc-green)",
  },
  {
    icon: "👥",
    title: "Tight-Knit Community",
    description: "We welcome an active community of 25+ players who collaborate, trade, and adventure together.",
    accent: "blue" as const,
    color: "var(--color-mc-blue)",
  },
  {
    icon: "⚡",
    title: "Premium Performance",
    description: "Dedicated hardware, 20 TPS, optimized plugins, and near-zero downtime. Lag-free, always.",
    accent: "red" as const,
    color: "var(--color-mc-red)",
  },
  {
    icon: "🌍",
    title: "Living World",
    description: "A persistent, evolving world with QoL plugins and player-driven economy.",
    accent: "green" as const,
    color: "var(--color-mc-green)",
  },
];

const stats = [
  { value: "25+", label: "Active Players", color: "var(--color-mc-green)" },
  { value: "50+", label: "Builds Created", color: "var(--color-mc-blue)" },
  { value: "100%", label: "Uptime", color: "var(--color-mc-yellow)" },
  { value: "3+", label: "Years Running", color: "var(--color-mc-purple)" },
];

export default function HomePage() {
  return (
    <PageShell fullWidth className="!p-0">
      {/* ── Hero Section ────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)]">
        {/* Animated block pattern background */}
        <div className="absolute inset-0 opacity-10">
          {/* Insert build image */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, var(--color-mc-green) 25%, transparent 25%),
              linear-gradient(-45deg, var(--color-mc-blue) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, var(--color-mc-red) 75%),
              linear-gradient(-45deg, transparent 75%, var(--color-mc-yellow) 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
          }} />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)] via-transparent to-[var(--color-bg-dark)]" />

        {/* Floating accent blocks */}
        <div className="absolute top-20 left-[10%] w-16 h-16 bg-[var(--color-mc-green)] rounded-[var(--radius-lg)] opacity-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-[15%] w-12 h-12 bg-[var(--color-mc-blue)] rounded-[var(--radius-md)] opacity-15 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[20%] w-10 h-10 bg-[var(--color-mc-yellow)] rounded-[var(--radius-md)] opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-[25%] w-14 h-14 bg-[var(--color-mc-red)] rounded-[var(--radius-lg)] opacity-10 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-60 left-[40%] w-8 h-8 bg-[var(--color-mc-purple)] rounded-[var(--radius-sm)] opacity-15 animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          {/* Server badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-[var(--radius-full)] border border-white/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-[var(--color-mc-green)] rounded-full animate-pulse" />
            <code className="text-sm font-mono text-[var(--color-mc-blue)]">{siteConfig.server.ip}</code>
            <span className="text-xs text-white/40">•</span>
            <span className="text-xs text-white/60">{siteConfig.server.version}</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
            {siteConfig.name.split(" ").map((word, i) => (
              <span key={i}>
                {i === 0 ? (
                  <span className="font-display font-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f44235] mb-6 animate-fade-in leading-tight">{word}</span>
                ) : (
                  <span> {word}</span>
                )}
              </span>
            ))}
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {siteConfig.tagline}. {siteConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link href="/apply">
              <Button size="lg" className="text-base px-10 animate-pulse-glow">
                Apply Now
              </Button>
            </Link>
            <Link href="/builds">
              <Button variant="outline" size="lg" className="text-base px-10 border-white/20 text-white hover:border-white/40 hover:text-white">
                View Builds
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade to cream */}
        <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
      </section>

      {/* ── Highlights Section ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14 scroll-reveal">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-4">
            Why the Klaatzoo Network?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            We&apos;re not just another SMP, we&apos;re a community-first server built on performance, creativity, and respect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children scroll-reveal">
          {highlights.map((item) => (
            <Card key={item.title} accent={item.accent} hover padding="lg">
              <div
                className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: `${item.color}15` }}
              >
                {item.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Stats Section ───────────────────────────────── */}
      <section className="bg-[var(--color-bg-dark)] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 scroll-reveal stagger-children">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-display font-black text-4xl sm:text-5xl mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-on-dark-muted)] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="scroll-reveal">
          <Card padding="lg" className="relative overflow-hidden text-center py-16">
            {/* Gradient accent background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mc-green)]/5 via-transparent to-[var(--color-mc-blue)]/5" />

            <div className="relative z-10">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-4">
                Ready to Join the Adventure?
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                Applications are open! Tell us about yourself and your builds, and become part of the Klaatzoo family.
              </p>
              <Link href="/apply">
                <Button size="lg" className="text-base px-10">
                  Start Your Application →
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
