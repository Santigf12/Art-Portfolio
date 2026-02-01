// app/[lang]/about/page.tsx (or app/about/page.tsx depending on your tree)
import { getAbout } from "@/lib/strapi.server";
import { toLang } from "@/lib/strapi.shared";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function AboutPage({ params, }: { params: Promise<{ lang: string }>; }) {
  const { lang } = await params;
  const locale = toLang(lang);

  const about = await getAbout(locale);
  if (!about) return <div className="p-12">About content not found</div>;

  return (
    <div className="h-[80dvh] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,192,203,0.35)_0%,rgba(255,192,203,0.18)_35%,rgba(255,255,255,1)_70%)]">
      {/* stays vertically centered */}
      <div className="mx-auto h-full flex items-center justify-center overflow-x-hidden px-4 md:px-20 lg:px-60">
        {/* keep centered, but allow internal scroll if too long */}
        <div className="w-full overflow-x-hidden overflow-y-auto max-h-[60dvh] md:max-h-[70dvh]">
          <div className="text-xs leading-relaxed tracking-normal text-black">
            <BlocksRenderer content={about.bio as never} />
          </div>
        </div>
      </div>
    </div>
  )
}
