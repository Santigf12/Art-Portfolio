"use client";

import { getStrapiMedia } from "@/lib/strapi";
import type { SelectedWork } from "@/lib/types";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";

export default function SelectedWorksCarousel({ items }: { items: SelectedWork[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  const slides = (items ?? []).filter((sw) => sw?.artwork?.image?.url && sw?.artwork?.slug);

  if (!slides.length) {
    return <div className="p-12 text-sm text-black/60">No selected works yet.</div>;
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[900px] relative">
        {/* arrows (optional but Cargo-ish) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="absolute left-[-72px] top-1/2 -translate-y-1/2 text-5xl leading-none px-4 py-3 text-black/30 hover:text-black/60 select-none"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="absolute right-[-72px] top-1/2 -translate-y-1/2 text-5xl leading-none px-4 py-3 text-black/30 hover:text-black/60 select-none"
        >
          ›
        </button>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((sw) => {
              const artwork = sw.artwork!;
              const img = artwork.image!;
              const src = getStrapiMedia(img.url);
              if (!src) return null;

              const w = img.width ?? 1200;
              const h = img.height ?? 1600;

              const caption = [artwork.title, artwork.year ? String(artwork.year) : null, artwork.medium, artwork.dimensions, ].filter(Boolean).join(". ");

              return (
                <div key={sw.documentId ?? sw.id} className="flex-[0_0_100%] min-w-0">
                  <figure className="flex flex-col items-center">
                    <Image
                        src={src}
                        alt={artwork.title}
                        width={w}
                        height={h}
                        priority
                        sizes="(max-width: 768px) 100vw, 900px"
                        className="w-full h-auto max-h-[85dvh] object-contain"
                    />
                    {caption && (
                      <figcaption className="mt-6 text-s tracking-wide text-black/70 text-center">
                        {caption}.
                      </figcaption>
                    )}
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}