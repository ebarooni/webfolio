import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { BLOG_POSTS } from '../post-catalog';
import { POST_CONTENT } from './post-content';

describe('POST_CONTENT', () => {
  it('has a text with the same sections for each post in each language', () => {
    for (const post of BLOG_POSTS) {
      const sectionCounts = post.languages.map((language) => {
        const content = POST_CONTENT[post.id][language];

        if (!content) {
          throw new Error(`${post.slug} has no ${language} text`);
        }

        const fixture = TestBed.createComponent(content);
        fixture.detectChanges();

        const root = fixture.nativeElement as HTMLElement;

        return [
          root.querySelectorAll('h2').length,
          root.querySelectorAll('h3').length,
          root.querySelectorAll('pre').length,
        ].join('/');
      });

      expect(new Set(sectionCounts).size).toBe(1);
    }
  });

  it('lists exactly the translated languages of each post in the catalog', () => {
    for (const post of BLOG_POSTS) {
      expect(Object.keys(POST_CONTENT[post.id]).sort()).toEqual(
        [...post.languages].sort(),
      );
    }
  });
});
