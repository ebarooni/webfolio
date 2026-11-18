import { describe, expect, it } from 'vitest';

import { postTitleTransitionName } from './post-title-transition';

describe('postTitleTransitionName', () => {
  it('makes a different name for each post', () => {
    expect(postTitleTransitionName('from-astro-to-angular')).toBe(
      'post-title-from-astro-to-angular',
    );
  });
});
