"use client";
import type { Lang } from "@/lib/types";
import { useEffect } from "react";

export default function SetHtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
