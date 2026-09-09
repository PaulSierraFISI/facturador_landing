import { createClient, type ClientConfig } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

export const SANITY_PROJECT_ID = '2veu0c14';
export const SANITY_DATASET = 'production';

const config: ClientConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-10-01',
  // El sitio se genera estatico y se reconstruye por webhook al publicar, asi
  // que conviene leer del CDN: es mas rapido y no consume cuota de la API.
  useCdn: true,
};

export const sanity = createClient(config);

const builder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
});
export function urlDeImagen(fuente: SanityImage) {
  return builder.image(fuente);
}

export interface SanityImage {
  asset: { _ref: string };
  alt?: string;
  caption?: string;
  hotspot?: unknown;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: SanityImage;
  publishedAt: string;
  _updatedAt: string;
  author?: string;
  tags?: string[];
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export type PostResumen = Omit<Post, 'body' | 'seoTitle' | 'seoDescription' | '_updatedAt'>;

const CAMPOS_RESUMEN = `
  _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, author, tags
`;

/** Articulos publicados, del mas reciente al mas antiguo. */
export async function listarPosts(): Promise<PostResumen[]> {
  return sanity.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
      | order(publishedAt desc){${CAMPOS_RESUMEN}}`
  );
}

export async function obtenerPost(slug: string): Promise<Post | null> {
  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ${CAMPOS_RESUMEN}, _updatedAt, body, seoTitle, seoDescription
    }`,
    { slug }
  );
}

export function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Lima',
  });
}
