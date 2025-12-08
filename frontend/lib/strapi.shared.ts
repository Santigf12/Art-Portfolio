// lib/strapi.shared.ts
import { LOCALES, type Lang } from "./types";

const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL || "http://localhost:1337";

export function getStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_PUBLIC_URL}${url}`;
}

export function toLang(x: string): Lang {
  return (LOCALES as readonly string[]).includes(x) ? (x as Lang) : "en";
}
