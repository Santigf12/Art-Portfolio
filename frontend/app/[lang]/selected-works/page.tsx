// app/selected-works/page.tsx
import SelectedWorksCarousel from "@/components/SelectedWorksCarousel";
import { getSelectedWorks } from "@/lib/strapi.server";
import { toLang } from "@/lib/strapi.shared";

export default async function SelectedWorksPage({ params, }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = toLang(lang); 
  
  const items = await getSelectedWorks(locale);
  return <SelectedWorksCarousel items={items} />;
}
