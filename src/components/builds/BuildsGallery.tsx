"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export type GalleryBuild = {
  id: string;
  title: string;
  description: string;
  author: string;
  imageUrls: unknown;
  category: string;
  featured: boolean;
};

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  featured: boolean;
  images: string[];
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

function toImageList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((url): url is string => typeof url === "string" && url.length > 0);
}

export function BuildsGallery({ builds }: { builds: GalleryBuild[] }) {
  const items = useMemo<GalleryItem[]>(
    () =>
      builds.map((build) => ({
        id: build.id,
        title: build.title,
        description: build.description,
        author: build.author,
        category: build.category,
        featured: build.featured,
        images: toImageList(build.imageUrls),
      })),
    [builds]
  );

  const [active, setActive] = useState<{ itemIndex: number; imageIndex: number } | null>(null);

  const activeItem = active ? items[active.itemIndex] : null;
  const activeImage = active && activeItem ? activeItem.images[active.imageIndex] : undefined;

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        return;
      }

      const item = items[active.itemIndex];
      if (!item || item.images.length < 2) return;

      if (event.key === "ArrowRight") {
        setActive({
          itemIndex: active.itemIndex,
          imageIndex: (active.imageIndex + 1) % item.images.length,
        });
      }

      if (event.key === "ArrowLeft") {
        setActive({
          itemIndex: active.itemIndex,
          imageIndex: (active.imageIndex - 1 + item.images.length) % item.images.length,
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, items]);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-20 items-stretch">
        {items.map((item, itemIndex) => (
          <Card
            key={item.id}
            hover
            padding="sm"
            accent={categoryAccents[item.category] ?? "none"}
            className="flex h-full flex-col overflow-hidden"
          >
            {item.images.length > 0 ? (
              <button
                type="button"
                onClick={() => setActive({ itemIndex, imageIndex: 0 })}
                className="group relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] text-left"
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                {item.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                    {item.images.length} photos
                  </span>
                )}
              </button>
            ) : (
              <div className="flex aspect-[16/10] w-full shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] text-4xl opacity-30">
                🏗️
              </div>
            )}

            <div className="flex min-h-0 flex-1 flex-col px-1 pt-4 pb-1">
              <div className="mb-2 flex min-h-7 flex-wrap items-center gap-2">
                {item.featured && (
                  <Badge variant="special" size="sm">
                    ⭐ Featured
                  </Badge>
                )}
                {item.category && (
                  <Badge variant="default" size="sm">
                    {item.category}
                  </Badge>
                )}
              </div>
              <h3 className="mb-2 line-clamp-1 font-display text-xl font-semibold text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mb-3 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.description}
              </p>
              <p className="mt-auto text-xs text-[var(--color-text-muted)]">
                Built by{" "}
                <span className="font-medium text-[var(--color-text-primary)]">{item.author}</span>
              </p>
            </div>
          </Card>
        ))}
      </section>

      {active && activeItem && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} gallery`}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white hover:bg-white/20"
          >
            Close
          </button>

          <figure
            className="flex max-h-full max-w-6xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={activeItem.title}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <figcaption className="max-w-3xl text-center text-white">
              <p className="font-display text-xl font-semibold">{activeItem.title}</p>
              <p className="mt-1 text-sm text-white/80">{activeItem.description}</p>
              <p className="mt-2 text-xs text-white/60">Built by {activeItem.author}</p>
            </figcaption>

            {activeItem.images.length > 1 && (
              <div className="flex gap-2">
                {activeItem.images.map((src, imageIndex) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive({ itemIndex: active.itemIndex, imageIndex })}
                    className={`h-14 w-20 overflow-hidden rounded-md border-2 ${
                      imageIndex === active.imageIndex ? "border-white" : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
