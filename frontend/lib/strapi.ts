// lib/strapi.ts
import type { About, Artwork, Project, SelectedWork, StrapiResponse } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<StrapiResponse<T>> {
  const url = new URL(`${STRAPI_URL}/api${path}`);

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getArtworks(): Promise<Artwork[]> {
  const response = await fetchAPI<Artwork[]>("/artworks", {
    populate: "*",
    sort: "order:asc",
  });
  return response.data;
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const response = await fetchAPI<Artwork[]>("/artworks", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  return response.data[0] || null;
}

export async function getSelectedWorks(): Promise<SelectedWork[]> {
  const response = await fetchAPI<SelectedWork[]>("/selected-works", {
    "populate[artwork][populate]": "image",
    sort: "order:asc",
  });
  return response.data;
}

export async function getAbout(): Promise<About | null> {
  const response = await fetchAPI<About>("/about", { populate: "*" });
  return response.data;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetchAPI<Project[]>("/projects", {
    populate: "*",
    sort: "order:asc",
  });
  return response.data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const response = await fetchAPI<Project[]>("/projects", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  return response.data[0] || null;
}

export function getStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Paged fetch for infinite scrolling / masonry feeds.
 * Uses the same STRAPI_URL + fetchAPI helper (no process.env.STRAPI_URL).
 */
export async function getArtworksPage({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const response = await fetchAPI<Artwork[]>("/artworks", {
    populate: "*",
    sort: "order:asc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  const pagination = response.meta?.pagination;

  return {
    items: response.data,
    hasMore: pagination ? pagination.page < pagination.pageCount : false,
    pagination,
  };
}
