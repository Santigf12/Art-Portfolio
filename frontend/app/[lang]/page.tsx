import { getArtworks, getStrapiMedia } from "@/lib/strapi.server";
import type { Artwork } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ params, }: { params: Promise<{ lang: "en" | "es" | "fr" }> }) {
  const { lang } = await params;
  const artworks: Artwork[] = await getArtworks(lang);

  return (
    <div>
      <div className="mx-auto columns-1 md:columns-2 [column-gap:1rem]">
        {artworks.map((artwork) => {
          if (!artwork.image) return null;

          const src = getStrapiMedia(artwork.image.url) || "";
          const w = artwork.image.width ?? 1200;
          const h = artwork.image.height ?? 1600;

          return (
            <div key={artwork.documentId} className="mb-8 break-inside-avoid">
              <Link href={`${lang}/artwork/${artwork.slug}`} className="group block">
                <Image
                  src={src}
                  alt={artwork.title}
                  width={w}
                  height={h}
                  className="w-full h-auto block group-hover:opacity-90 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
