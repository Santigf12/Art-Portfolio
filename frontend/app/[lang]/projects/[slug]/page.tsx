import ProjectCarousel from "@/components/ProjectCarousel";
import { getProjectBySlug } from "@/lib/strapi.server";
import { toLang } from "@/lib/strapi.shared";
import { notFound } from "next/navigation";

export default async function ProjectSlugPage({ params, }: { params: Promise<{ lang: string; slug: string }>; }) {
  const { lang, slug } = await params;
  const locale = toLang(lang); 

  const p = await getProjectBySlug(slug, locale);
  if (!p) return notFound();

  return (
    <div className="w-full py-10">
      <div className="mx-auto max-w-full">
        <section className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-center">
          {/* left text */}
          <div className="max-w-[360px]">
            <h1 className="italic text-2xl text-black/80">{p.title}</h1>

            {p.description && (
              <p className="mt-3 text-lg leading-relaxed text-black/80 whitespace-pre-line">
                {p.description}
              </p>
            )}

            {p.location && <p className="mt-6 italic text-base text-black/70">{p.location}</p>}
          </div>

          {/* right carousel */}
          <div className="w-full">
            <ProjectCarousel images={p.images ?? []} title={p.title} />
          </div>
        </section>
      </div>
    </div>
  );
}
