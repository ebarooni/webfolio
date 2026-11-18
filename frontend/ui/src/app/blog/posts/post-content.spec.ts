import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { languages } from '../../config/languages';
import { BLOG_POSTS } from '../post-catalog';
import { POST_CONTENT } from './post-content';

describe('POST_CONTENT', () => {
  it('has a text with the same sections for each post in each language', () => {
    for (const post of BLOG_POSTS) {
      const sectionCounts = languages.map((language) => {
        const fixture = TestBed.createComponent(
          POST_CONTENT[post.id][language],
        );
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
});
