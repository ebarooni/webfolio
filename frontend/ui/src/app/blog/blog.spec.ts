import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { BlogComponent } from './blog';
import { BLOG_POSTS } from './post-catalog';

describe('BlogComponent', () => {
  let fixture: ComponentFixture<BlogComponent>;

  function rows(): HTMLAnchorElement[] {
    return fixture.debugElement
      .queryAll(By.css('li a'))
      .map((row) => row.nativeElement as HTMLAnchorElement);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComponent, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    fixture.detectChanges();
  });

  it('should show the number of posts in the header', () => {
    const eyebrow = fixture.debugElement.query(By.css('app-page-header p'))
      .nativeElement as HTMLElement;

    expect(eyebrow.textContent.trim()).toBe(
      `Writing · ${BLOG_POSTS.length} posts`,
    );
  });

  it('should link every post to its own page, newest first', () => {
    expect(rows().map((row) => row.getAttribute('href'))).toEqual(
      BLOG_POSTS.map((post) => `/blog/${post.slug}`),
    );
  });

  it('should show the title, the summary and the read time of a post', () => {
    const text = rows()[0].textContent;

    expect(text).toContain(BLOG_POSTS[0].title);
    expect(text).toContain(BLOG_POSTS[0].summary);
    expect(text).toContain('10 min read');
  });

  it('should format the dates for the active language', () => {
    expect(rows()[0].textContent).toContain('Apr 4, 2026');

    TestBed.inject(TranslocoService).setActiveLang('de');
    fixture.detectChanges();

    expect(rows()[0].textContent).toContain('4. Apr. 2026');
    expect(rows()[0].textContent).toContain('10 Min. Lesezeit');
  });
});
