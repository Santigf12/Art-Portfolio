// components/Sidebar.tsx
"use client";

import { LOCALES, type Lang } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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

  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);

  const maybeLang = parts[0];
  const maybeSection = parts[1];

  const defaultLang = LOCALES[0];
  const lang: Lang = isLang(maybeLang) ? maybeLang : defaultLang;
  const section: Section = isSection(maybeSection) ? maybeSection : "about";

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

  // CHANGE THESE to your actual public paths:
  const substackImg = "/substack.png"; // normal
  const substackImgHover = "/substack-hover.png"; // hover

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-56 bg-white">
      {/* Make it a column so we can push the bottom link down */}
      <div className="h-full flex flex-col">
        <div className="p-4">
          <h1 className="text-4xl leading-none mb-6 font-semibold tracking-tight">
            <Link href={`/${lang}`} className="hover:opacity-80 transition">
              ana bárbara
            </Link>
          </h1>

          <div className="mb-6 flex gap-2 text-xs font-semibold uppercase tracking-wide">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={switchLocaleHref(l)}
                className={[
                  "rounded px-2 py-1 transition",
                  l === lang ? "bg-black text-white" : "text-black hover:opacity-70",
                ].join(" ")}
              >
                {l}
              </Link>
            ))}
          </div>

          <nav className="text-sm leading-6 font-semibold">
            <Link href={href("about")} className="block hover:opacity-80 transition">
              {t.about}
            </Link>
            <Link href={href("selected-works")} className="block hover:opacity-80 transition">
              {t.selected}
            </Link>
            <Link href={href("projects")} className="block hover:opacity-80 transition">
              {t.projects}
            </Link>
          </nav>

          <div className="my-4 h-px" /> {/* space hidden divider */}

          <nav className="text-sm leading-6 font-semibold">
            <a
              href="mailto:barbigf_4@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition"
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
            <span className="relative block w-32 h-32 group-hover:hidden">
              <Image src="/substack.png" alt="" fill className="object-contain" />
            </span>

            <span className="relative hidden w-32 h-32 group-hover:block">
              <Image src="/substack-hover.png" alt="" fill className="object-contain" />
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}