import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { BLOG_POSTS } from '../../blog/post-catalog';
import { Route } from '../../config/route';
import { LatestPosts } from './latest-posts';

describe('LatestPosts', () => {
  let fixture: ComponentFixture<LatestPosts>;

  function rowTexts(): string[] {
    return fixture.debugElement
      .queryAll(By.css('li a'))
      .map((row) =>
        (row.nativeElement as HTMLElement).textContent
          .replace(/\s+/g, ' ')
          .trim(),
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestPosts, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LatestPosts);
    fixture.detectChanges();
  });

  it('should show the two newest posts', () => {
    expect(rowTexts()).toHaveLength(2);
    expect(rowTexts()[0]).toContain(BLOG_POSTS[0].title);
    expect(rowTexts()[0]).toContain('10 min read');
  });

  it('should link every row and the header to the blog', () => {
    const links = fixture.debugElement
      .queryAll(By.css('a'))
      .map((link) =>
        (link.nativeElement as HTMLAnchorElement).getAttribute('href'),
      );

    expect(links).toEqual(Array(3).fill(`/${Route.BLOG}`));
  });

  it('should format the dates for the active language', () => {
    expect(rowTexts()[0]).toContain('Apr 4, 2026');

    TestBed.inject(TranslocoService).setActiveLang('de');
    fixture.detectChanges();

    expect(rowTexts()[0]).toContain('04.04.2026');
    expect(rowTexts()[0]).toContain('10 Min. Lesezeit');
  });
});
