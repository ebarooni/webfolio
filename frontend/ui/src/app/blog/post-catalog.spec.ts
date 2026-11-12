import { describe, expect, it } from 'vitest';

import { BLOG_POSTS } from './post-catalog';

describe('post catalog', () => {
  it('should list the newest post first', () => {
    const times = BLOG_POSTS.map((post) => post.date.getTime());

    expect(times).toEqual([...times].sort((a, b) => b - a));
  });
});
