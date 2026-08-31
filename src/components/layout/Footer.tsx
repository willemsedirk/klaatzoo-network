import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]">
      {/* Colorful divider bar */}
      <div className="h-1 flex">
        <div className="flex-1 bg-[var(--color-mc-red)]" />
        <div className="flex-1 bg-[var(--color-mc-green)]" />
        <div className="flex-1 bg-[var(--color-mc-blue)]" />
        <div className="flex-1 bg-[var(--color-mc-yellow)]" />
        <div className="flex-1 bg-[var(--color-mc-purple)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              {/* Logo */}
              <div className="w-8 h-8 bg-[var(--color-mc-green)] rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold text-sm">
                K
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-on-dark-muted)] mb-4">
              {siteConfig.footer.tagline}
            </p>
            {/* Server IP */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-dark-secondary)] rounded-[var(--radius-md)] border border-[var(--color-border-dark)]">
              <span className="w-2 h-2 bg-[var(--color-mc-blue)] rounded-full animate-pulse" />
              <code className="text-sm font-mono text-[var(--color-mc-blue)]">
                {siteConfig.server.ip}
              </code>
            </div>
          </div>

          {/* Link sections */}
          {siteConfig.footer.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[var(--color-text-on-dark)]">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-mc-green)] transition-colors duration-200"
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-dark)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-on-dark-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. Not affiliated with Mojang Studios.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-on-dark-muted)]">
            <span>{siteConfig.server.platform}</span>
            <span>•</span>
            <span>v{siteConfig.server.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
