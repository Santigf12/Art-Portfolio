import { getArtworkBySlug, getStrapiMedia } from "@/lib/strapi";
import type { Lang } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArtworkSlugPage({ params, }: { params: Promise<{ slug: string, lang: Lang }>; }) {
  const { slug, lang } = await params;

  const artwork = await getArtworkBySlug(slug, lang);
  if (!artwork) return notFound();

  const img = artwork.image;
  const src = getStrapiMedia(img?.url);
  if (!img || !src) return notFound();

  const w = img.width ?? 1200;
  const h = img.height ?? 1600;

  const caption = [ artwork.title, artwork.year ? String(artwork.year) : null, artwork.medium, artwork.dimensions, ].filter(Boolean).join(". ");

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[900px]">
        <figure className="flex flex-col items-center">
          <Link href="/" className="block w-full cursor-pointer">
            <Image
              src={src}
              alt={artwork.title}
              width={w}
              height={h}
              priority
              sizes="(max-width: 768px) 100vw, 760px"
              className="w-full h-auto max-h-[85dvh] object-contain"
            />
          </Link>

          {caption && (
            <figcaption className="mt-6 text-s tracking-wide text-black/70 text-center">
              {caption}.
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  );
}