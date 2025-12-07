// app/selected-works/page.tsx
import SelectedWorksCarousel from "@/components/SelectedWorksCarousel";
import { getSelectedWorks } from "@/lib/strapi";

export default async function SelectedWorksPage() {
  const items = await getSelectedWorks();
  return <SelectedWorksCarousel items={items} />;
}
