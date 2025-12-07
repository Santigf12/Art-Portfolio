// app/selected-works/page.tsx
import SelectedWorksCarousel from "@/components/SelectedWorksCarousel";
import { getSelectedWorks } from "@/lib/strapi";
import type { Lang } from "@/lib/types";

export default async function SelectedWorksPage({ params, }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const items = await getSelectedWorks(lang);
  return <SelectedWorksCarousel items={items} />;
}
