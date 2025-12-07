export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Artwork {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  medium: string | null;
  dimensions: string | null;
  year: number | null;
  slug: string;
  order: number;
  image: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SelectedWork {
  id: number;
  documentId: string;
  order: number;
  artwork: Artwork;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  location: string | null; // e.g. "Mexico City"
  order: number | null;
  slug: string;
  images: StrapiImage[]
  createdAt: string;
  updatedAt: string;
}

export interface About {
  id: number;
  documentId: string;
  bio: string;
  profileimage: StrapiImage | null;
  linkedin: string | null;
  substack: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const LOCALES = ["en", "es", "fr"] as const;

export type Lang = (typeof LOCALES)[number];
