// lib/strapi.ts
import { draftMode } from "next/headers";
import type { About, Artwork, Lang, Project, SelectedWork, StrapiResponse } from "./types";

const STRAPI_URL = process.env.STRAPI_INTERNAL_URL || "http://localhost:1337";

export async function fetchAPI<T>(
  path: string,
  params: Record<string, string> = {},
  locale?: Lang
): Promise<StrapiResponse<T>> {
  const url = new URL(`${STRAPI_URL}/api${path}`);

  if (locale) url.searchParams.set("locale", locale);

  const { isEnabled } = await draftMode();
  if (isEnabled) {
    url.searchParams.set("status", "draft");
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isEnabled && process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getArtworks(locale?: Lang): Promise<Artwork[]> {
  const response = await fetchAPI<Artwork[]>("/artworks", {
    populate: "*",
    sort: "order:asc",
  }, locale);
  return response.data;
}

export async function getArtworkBySlug(slug: string, locale?: Lang): Promise<Artwork | null> {
  const response = await fetchAPI<Artwork[]>("/artworks", {
    "filters[slug][$eq]": slug,
    populate: "*",
  }, locale);
  return response.data[0] || null;
}

export async function getSelectedWorks(locale?: Lang): Promise<SelectedWork[]> {
  const response = await fetchAPI<SelectedWork[]>("/selected-works", {
    "populate[artwork][populate]": "image",
    sort: "order:asc",
  }, locale);
  return response.data;
}

export async function getAbout(locale?: Lang): Promise<About | null> {
  const response = await fetchAPI<About>("/about", { populate: "*" }, locale);
  return response.data;
}

export async function getProjects(locale?: Lang): Promise<Project[]> {
  const response = await fetchAPI<Project[]>("/projects", {
    populate: "*",
    sort: "order:asc",
  }, locale);
  return response.data;
} 

export async function getProjectBySlug(slug: string, locale?: Lang): Promise<Project | null> {
  const response = await fetchAPI<Project[]>("/projects", {
    "filters[slug][$eq]": slug,
    populate: "*",
  }, locale);
  return response.data[0] || null;
}

export function getStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}