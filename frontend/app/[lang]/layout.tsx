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
      <main
        className="min-h-screen pt-24 px-4 pb-6 md:pt-6 md:pr-6 md:pb-6 md:px-0 md:pl-[calc(14rem+1.5rem)]"
      >
        {children}
      </main>
    </>
  );
}