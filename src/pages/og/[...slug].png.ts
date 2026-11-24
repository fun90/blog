import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { getPublishedPosts } from '../../utils/posts';
import { generateOgImage } from '../../utils/og';

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return [
    {
      params: { slug: 'default' },
      props: {
        title: SITE.title,
        subtitle: SITE.tagline,
        category: '个人博客 · 工具分享',
      },
    },
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: {
        title: post.data.title,
        subtitle: post.data.description,
        category: post.data.category,
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    subtitle: props.subtitle,
    category: props.category,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
