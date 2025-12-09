// frontend/app/sitemap.ts
import { LOCALES, type Lang } from "@/lib/types";
import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ana-barbara.com").replace(/\/$/, "");

const STRAPI_URL = (
  process.env.STRAPI_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL ??
  "http://localhost:1337"
).replace(/\/$/, "");

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN; // optional (only if your Strapi is private)

type StrapiItem = Record<string, unknown>;
type StrapiCollectionResponse = { data: StrapiItem[]; meta?: unknown };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStrapiCollectionResponse(value: unknown): value is StrapiCollectionResponse {
  if (!isRecord(value)) return false;
  const data = value["data"];
  return Array.isArray(data);
}

function getStringField(obj: StrapiItem, key: string): string | null {
  const v = obj[key];
  return typeof v === "string" ? v : null;
}

function getDateField(obj: StrapiItem, key: string): Date | null {
  const v = obj[key];
  if (typeof v !== "string") return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function fetchAllSlugs(
  apiPath: string,
  lang: Lang
): Promise<Array<{ slug: string; lastModified?: Date }>> {
  const url = new URL(`/api/${apiPath}`, STRAPI_URL);

  // Strapi v5: response is flattened (fields are top-level in each item) :contentReference[oaicite:2]{index=2}
  url.searchParams.set("fields[0]", "slug");
  url.searchParams.set("fields[1]", "updatedAt");
  url.searchParams.set("pagination[pageSize]", "1000");

  // Strapi v5: publicationState removed; use status (published is default, but explicit is fine) :contentReference[oaicite:3]{index=3}
  url.searchParams.set("status", "published");

  // If i18n is enabled, this fetches the right locale
  url.searchParams.set("locale", lang);

  const res = await fetch(url.toString(), {
    headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const json: unknown = await res.json();
  if (!isStrapiCollectionResponse(json)) return [];

  const items = json.data;

  const out: Array<{ slug: string; lastModified?: Date }> = [];
  for (const item of items) {
    const slug = getStringField(item, "slug");
    if (!slug) continue;

    const lastModified = getDateField(item, "updatedAt") ?? undefined;
    out.push({ slug, lastModified });
  }

  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES as readonly Lang[]) {
    // Static pages per language
    const staticUrls = [
      `/${lang}`,
      `/${lang}/about`,
      `/${lang}/projects`,
      `/${lang}/selected-works`,
    ];

    for (const path of staticUrls) {
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: path.endsWith(`/${lang}`) ? 1.0 : 0.8,
      });
    }

    // Dynamic pages from Strapi
    const [artworks, projects] = await Promise.all([
      fetchAllSlugs("artworks", lang),
      fetchAllSlugs("projects", lang),
    ]);

    for (const a of artworks) {
      entries.push({
        url: `${SITE_URL}/${lang}/artwork/${a.slug}`,
        lastModified: a.lastModified ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const p of projects) {
      entries.push({
        url: `${SITE_URL}/${lang}/projects/${p.slug}`,
        lastModified: p.lastModified ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
