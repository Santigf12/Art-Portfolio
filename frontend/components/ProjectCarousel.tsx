"use client";

import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiImage } from "@/lib/types";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

export default function ProjectCarousel({ images, title, }: { images: StrapiImage[]; title: string;}) {
  const slides = (images ?? []).filter((img) => img?.url);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollPrev, scrollNext]);

  if (!slides.length) return null;

  return (
    <div className="w-full">
        {/* Anchor arrows to the viewport (image area), not the full-width row */}
        <div className="relative">
        <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-black/30 hover:text-black/60 select-none text-5xl leading-none"
        >
            ‹
        </button>

        <button
            type="button"
            onClick={scrollNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-black/30 hover:text-black/60 select-none text-5xl leading-none"
        >
            ›
        </button>

        <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
            {slides.map((img) => {
                const src = getStrapiMedia(img.url);
                if (!src) return null;

                const w = img.width ?? 1600;
                const h = img.height ?? 1200;

                return (
                <div key={img.documentId ?? img.id} className="flex-[0_0_100%] min-w-0">
                    <Image
                    src={src}
                    alt={img.alternativeText || title}
                    width={w}
                    height={h}
                    priority={false}
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="w-full h-auto max-h-[70dvh] object-contain"
                    />
                </div>
                );
            })}
            </div>
        </div>
        </div>
    </div>
    );
}
