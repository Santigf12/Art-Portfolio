// app/about/page.tsx
import { getAbout } from "@/lib/strapi";
import type { Lang } from "@/lib/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function AboutPage({ params, }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const about = await getAbout(lang);
  if (!about) return <div className="p-12">About content not found</div>;

  return (
    // "pink drop" centered, fades to white edges (ONLY on About)
    <div className="h-[80dvh] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,192,203,0.35)_0%,rgba(255,192,203,0.18)_35%,rgba(255,255,255,1)_70%)]">
      <div className="mx-auto h-full px-25 flex items-center overflow-x-hidden">
        {/* scroll only this block if content is long */}
        <div className="w-full overflow-x-hidden">
          <div className="text-xl leading-relaxed text-black">
            <BlocksRenderer content={about.bio as never} />
          </div>
        </div>
      </div>
    </div>
  );
}