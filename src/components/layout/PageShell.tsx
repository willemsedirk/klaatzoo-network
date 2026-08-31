"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  /** Disable the max-width container */
  fullWidth?: boolean;
}

/**
 * Page wrapper with max-width, padding, and scroll-reveal animation support.
 * Wrap page sections in elements with className="scroll-reveal" for auto-reveal on scroll.
 */
export function PageShell({ children, className, fullWidth = false }: PageShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = container.querySelectorAll(".scroll-reveal, .stagger-children");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main
      ref={containerRef}
      className={cn(
        "min-h-screen pt-20",
        !fullWidth && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </main>
  );
}
