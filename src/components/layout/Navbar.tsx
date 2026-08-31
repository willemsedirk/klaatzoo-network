"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [effectivePathname, setEffectivePathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl) {
        try {
          setEffectivePathname(new URL(callbackUrl, window.location.origin).pathname);
          return;
        } catch (e) {
          setEffectivePathname(callbackUrl);
          return;
        }
      }
    }
    setEffectivePathname(pathname);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const accentColors = [
    "var(--color-mc-red)",
    "var(--color-mc-green)",
    "var(--color-mc-blue)",
    "var(--color-mc-yellow)",
    "var(--color-mc-purple)",
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        !isTransparent
          ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-card)] border-b border-[var(--color-border-light)]"
          : "bg-transparent"
      )}
    >
      {/* Colorful top bar */}
      <div className="h-1 flex">
        {accentColors.map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-[var(--color-mc-green)] rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              K
            </div>
            <span className={cn(
              "font-display font-bold text-lg tracking-tight",
              isTransparent ? "text-white" : "text-[var(--color-text-secondary)]"
            )}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {siteConfig.nav.map((link, i) => {
              const isActive = link.href === "/" ? effectivePathname === "/" : effectivePathname?.startsWith(link.href);
              const activeColor = accentColors[i % accentColors.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-200",
                    !isActive && (isTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]/50")
                  )}
                  style={isActive ? { color: activeColor } : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full transition-all duration-300"
                      style={{ backgroundColor: activeColor }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user && (
              <>
                <Link href={
                  (session.user as { role?: string }).role === "ADMIN" || (session.user as { role?: string }).role === "MODERATOR"
                    ? "/admin"
                    : "/dashboard"
                }>
                  <Button variant="ghost" size="sm" className={cn(isTransparent && "text-white hover:bg-white/10 hover:text-white")}>
                    {session.user.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "md:hidden p-2 rounded-[var(--radius-md)]",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
            )}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="space-y-1 pt-2">
            {siteConfig.nav.map((link, i) => {
              const isActive = link.href === "/" ? effectivePathname === "/" : effectivePathname?.startsWith(link.href);
              const activeColor = accentColors[i % accentColors.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-colors",
                    !isActive && "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  )}
                  style={isActive ? { color: activeColor, backgroundColor: "var(--color-bg-secondary)" } : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            {session?.user && (
              <div className="pt-2 border-t border-[var(--color-border)] space-y-1">
                <Link
                  href={
                    (session.user as { role?: string }).role === "ADMIN" || (session.user as { role?: string }).role === "MODERATOR"
                      ? "/admin"
                      : "/dashboard"
                  }
                  className="block px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)]"
                >
                  {(session.user as { role?: string }).role === "ADMIN" || (session.user as { role?: string }).role === "MODERATOR" ? "Admin" : "Dashboard"}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2.5 text-sm font-medium text-[var(--color-mc-red)] hover:bg-[var(--color-danger-light)] rounded-[var(--radius-md)]"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
