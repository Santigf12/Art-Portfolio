import SetHtmlLang from "@/components/SetHtmlLang";
import Sidebar from "@/components/Sidebar";
import { toLang } from "@/lib/strapi.shared";

export default async function LangLayout({ children, params,}: { children: React.ReactNode; params: Promise<{ lang: string }>; }) {
  const { lang } = await params;
  const locale = toLang(lang); 

  return (
    <>
      <SetHtmlLang lang={locale} />
      <Sidebar />
      <main className="min-h-screen pt-6 pr-6 pb-6 pl-[calc(14rem+1.5rem)]">
        {children}
      </main>
    </>
  );
}