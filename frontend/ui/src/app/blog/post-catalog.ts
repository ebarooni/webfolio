import { Language } from '../config/languages';

export enum Posts {
  ASTRO_TO_ANGULAR,
  VPS_HOSTING,
}

// The title and the summary of each post are in the localization files,
// under blog.posts.<slug>.
export type BlogPostPreview = Readonly<{
  date: Date;
  id: Posts;
  /**
   * The languages that have a translation of the text. English is always
   * one. Other languages show the English text with a notice, and search
   * engines get the English page as the canonical one.
   */
  languages: readonly Language[];
  readTime: number;
  slug: string;
}>;

const UNSORTED_POSTS: readonly BlogPostPreview[] = [
  {
    date: new Date('2024-12-01'),
    id: Posts.ASTRO_TO_ANGULAR,
    languages: ['en', 'de', 'nl'],
    readTime: 3,
    slug: 'from-astro-to-angular',
  },
  {
    date: new Date('2026-04-04'),
    id: Posts.VPS_HOSTING,
    languages: ['en', 'de', 'nl'],
    readTime: 10,
    slug: 'moving-away-from-firebase-hosting',
  },
];

export const BLOG_POSTS: readonly BlogPostPreview[] = [...UNSORTED_POSTS].sort(
  (first, second) => second.date.getTime() - first.date.getTime(),
);

export function findPostBySlug(slug: string): BlogPostPreview | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
