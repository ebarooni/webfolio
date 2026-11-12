export enum Posts {
  ASTRO_TO_ANGULAR,
  VPS_HOSTING,
}

export type BlogPostPreview = Readonly<{
  date: Date;
  id: Posts;
  readTime: number;
  summary: string;
  title: string;
}>;

const UNSORTED_POSTS: readonly BlogPostPreview[] = [
  {
    date: new Date('2024-12-01'),
    id: Posts.ASTRO_TO_ANGULAR,
    readTime: 3,
    summary:
      'Why static simplicity wasn’t enough for my portfolio and how Angular gave me room to grow.',
    title: 'From Astro to Angular: Why I Rebuilt My Portfolio',
  },
  {
    date: new Date('2026-04-04'),
    id: Posts.VPS_HOSTING,
    readTime: 10,
    summary:
      'I decided to deploy my portfolio website on a VPS instead of using Firebase Hosting. In this blog post, I provide a step by step guide on the migration and explain the reason behind this decision.',
    title: 'Moving away from Firebase Hosting',
  },
];

export const BLOG_POSTS: readonly BlogPostPreview[] = [...UNSORTED_POSTS].sort(
  (first, second) => second.date.getTime() - first.date.getTime(),
);
