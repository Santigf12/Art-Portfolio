import SetHtmlLang from "@/components/SetHtmlLang";
import Sidebar from "@/components/Sidebar";
import type { Lang } from "@/lib/types";

export default async function LangLayout({ children, params,}: { children: React.ReactNode; params: Promise<{ lang: Lang }>; }) {
  const { lang } = await params;

  return (
    <>
      <SetHtmlLang lang={lang} />
      <Sidebar />
      <main className="min-h-screen pt-6 pr-6 pb-6 pl-[calc(14rem+1.5rem)]">
        {children}
      </main>
    </>
  );
}