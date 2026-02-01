// components/Sidebar.tsx
"use client";

import { LOCALES, type Lang } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Section = "about" | "selected-works" | "projects";

const LABELS: Record<Lang, { about: string; selected: string; projects: string }> = {
  en: { about: "about", selected: "selected works", projects: "projects" },
  es: { about: "acerca de", selected: "obras seleccionadas", projects: "proyectos" },
  fr: { about: "à propos", selected: "sélection d’œuvres", projects: "projets" },
};

function isLang(x: string | undefined): x is Lang {
  return !!x && (LOCALES as readonly string[]).includes(x);
}
function isSection(x: string | undefined): x is Section {
  return x === "about" || x === "selected-works" || x === "projects";
}

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const { lang, section, parts } = useMemo(() => {
    const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
    const maybeLang = parts[0];
    const maybeSection = parts[1];

    const defaultLang = LOCALES[0];
    const lang: Lang = isLang(maybeLang) ? maybeLang : defaultLang;
    const section: Section = isSection(maybeSection) ? maybeSection : "about";

    return { lang, section, parts };
  }, [pathname]);

  const t = LABELS[lang];
  const href = (s: Section) => `/${lang}/${s}`;

  const switchLocaleHref = (nextLang: Lang) => {
    const nextParts = [...parts];
    if (nextParts.length === 0) return `/${nextLang}`;
    if (isLang(nextParts[0])) nextParts[0] = nextLang;
    else nextParts.unshift(nextLang);

    const qs = searchParams?.toString();
    return `/${nextParts.join("/")}${qs ? `?${qs}` : ""}`;
  };

  const onNav = () => setOpen(false);

  return (
    <>
      {/* -------------------- MOBILE TOP BAR -------------------- */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-base leading-none font-semibold tracking-tight">
                <Link href={`/${lang}`} className="hover:opacity-80 transition" onClick={onNav}>
                  ana bárbara
                </Link>
              </h1>

              <div className="mt-3 flex gap-4 text-xs font-semibold tracking-wide">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={switchLocaleHref(l)}
                    onClick={onNav}
                    className={[
                      "relative py-1 transition-opacity",
                      l === lang
                        ? "text-black after:absolute after:left-0 after:-bottom-0 after:h-[2px] after:w-full after:bg-black after:content-['']"
                        : "text-black hover:opacity-70",
                    ].join(" ")}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-xs font-semibold tracking-wide hover:opacity-70 transition"
            >
              {open ? "close" : "menu"}
            </button>
          </div>
        </div>

        {/* subtle divider */}
        <div className="h-px w-full bg-black/10" />
      </header>

      {/* -------------------- MOBILE MENU OVERLAY -------------------- */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* backdrop */}
          <button
            aria-label="Close menu backdrop"
            className="absolute inset-0 bg-white/80"
            onClick={() => setOpen(false)}
          />

          {/* menu panel */}
          <div className="absolute left-0 right-0 top-[73px] bg-white">
            <div className="px-4 py-5">
              <nav className="text-xs font-semibold space-y-2">
                <Link
                  href={href("about")}
                  onClick={onNav}
                  className="block hover:opacity-80 hover:text-red-600"
                >
                  {t.about}
                </Link>
                <Link
                  href={href("selected-works")}
                  onClick={onNav}
                  className="block hover:opacity-80 hover:text-red-600"
                >
                  {t.selected}
                </Link>
                <Link
                  href={href("projects")}
                  onClick={onNav}
                  className="block hover:opacity-80 hover:text-red-600"
                >
                  {t.projects}
                </Link>
                <a
                  href="mailto:barbigf_4@hotmail.com"
                  className="block hover:opacity-80 hover:text-red-600"
                  onClick={onNav}
                >
                  email
                </a>
              </nav>

              <div className="mt-6">
                <a
                  href="https://barbigf.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:opacity-80 transition"
                  onClick={onNav}
                >
                  <span className="relative block w-10 h-10">
                    <Image src="/substack.png" alt="" fill className="object-contain" />
                  </span>
                  <span className="text-xs font-semibold">substack</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- DESKTOP SIDEBAR (your original) -------------------- */}
      <aside className="hidden md:block fixed left-2.5 top-6 bottom-6 w-56 bg-white">
        <div className="h-full flex flex-col">
          <div className="p-4">
            <h1 className="text-base leading-none mb-6 font-semibold tracking-tight">
              <Link href={`/${lang}`} className="hover:opacity-80 transition">
                ana bárbara
              </Link>
            </h1>

            <div className="mb-6 flex gap-4 text-xs font-semibold tracking-wide">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={switchLocaleHref(l)}
                  className={[
                    "relative py-1 transition-opacity",
                    l === lang
                      ? "text-black after:absolute after:left-0 after:-bottom-0 after:h-[2px] after:w-full after:bg-black after:content-['']"
                      : "text-black hover:opacity-70",
                  ].join(" ")}
                >
                  {l}
                </Link>
              ))}
            </div>

            <nav className="text-xs font-semibold">
              <Link href={href("about")} className="block hover:opacity-80 hover:text-red-600">
                {t.about}
              </Link>
              <Link href={href("selected-works")} className="block hover:opacity-80 hover:text-red-600">
                {t.selected}
              </Link>
              <Link href={href("projects")} className="block hover:opacity-80 hover:text-red-600">
                {t.projects}
              </Link>
              <a
                href="mailto:barbigf_4@hotmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 hover:text-red-600"
              >
                email
              </a>
            </nav>
          </div>

          <div className="mt-auto p-4">
            <a
              href="https://barbigf.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <span className="relative block w-18 h-18 group-hover:hidden">
                <Image src="/substack.png" alt="" fill className="object-contain" />
              </span>

              <span className="relative hidden w-18 h-18 group-hover:block">
                <Image src="/substack-hover.png" alt="" fill className="object-contain" />
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}