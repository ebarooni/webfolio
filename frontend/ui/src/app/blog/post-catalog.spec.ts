import { describe, expect, it } from 'vitest';

import { BLOG_POSTS, findPostBySlug } from './post-catalog';

describe('post catalog', () => {
  it('should list the newest post first', () => {
    const times = BLOG_POSTS.map((post) => post.date.getTime());

    expect(times).toEqual([...times].sort((a, b) => b - a));
  });

  it('should give every post a unique slug that is safe in a URL', () => {
    const slugs = BLOG_POSTS.map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it('should find a post by its slug', () => {
    expect(findPostBySlug(BLOG_POSTS[0].slug)).toBe(BLOG_POSTS[0]);
  });

  it('should find no post for an unknown slug', () => {
    expect(findPostBySlug('unknown')).toBeUndefined();
  });
});
