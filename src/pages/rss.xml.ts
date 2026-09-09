import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { listarPosts } from '../lib/sanity';
import { SITE_NAME, SITE_DESCRIPTION } from '../config';

export async function GET(context: APIContext) {
  const posts = await listarPosts();
  return rss({
    title: `${SITE_NAME} — Blog`,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}`,
    })),
    customData: '<language>es-pe</language>',
  });
}
