import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Route } from '../../config/route';
import { AppStore } from '../../store/app/app.store';
import { pageRoutesOf } from '../../../testing/page-routes';
import { BookmarkStatusPage } from './bookmark-status';
import { APP_STORE_URL } from './bookmark-status.copy';
import { PAGE_SEO, PAGE_TITLE } from './bookmark-status.seo';

describe('BookmarkStatusPage', () => {
  let fixture: ComponentFixture<BookmarkStatusPage>;
  let component: BookmarkStatusPage;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [BookmarkStatusPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('creates the page', () => {
    expect(component).toBeTruthy();
  });

  it('registers the lazy route before the wildcard', () => {
    const children = pageRoutesOf('en');
    const page = children.find((route) => {
      return route.path === Route.APPS_BOOKMARK_STATUS;
    });
    const wildcardIndex = children.findIndex((route) => route.path === '**');
    const pageIndex = children.findIndex((route) => {
      return route.path === Route.APPS_BOOKMARK_STATUS;
    });

    expect(page?.title).toBe(PAGE_TITLE);
    expect(page?.data).toEqual({
      page: Route.APPS_BOOKMARK_STATUS,
      seo: { kind: 'english', config: PAGE_SEO },
    });
    expect(pageIndex).toBeGreaterThan(-1);
    expect(pageIndex).toBeLessThan(wildcardIndex);
  });

  it('renders the final headline, one badge, and a text store button', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    const title = heading.nativeElement as HTMLHeadingElement;
    const badges = fixture.debugElement.queryAll(By.css('.store-badge'));
    const storeButtons = fixture.debugElement.queryAll(By.css('.store-button'));
    const storeButton = storeButtons[0]?.nativeElement as HTMLAnchorElement;

    expect(fixture.debugElement.queryAll(By.css('h1')).length).toBe(1);
    expect(title.textContent).toContain('Already bookmarked?');
    expect(title.textContent).toContain('Now you’ll know.');
    expect(badges.length).toBe(1);
    expect(
      (
        badges[0]?.query(By.css('img')).nativeElement as HTMLImageElement
      ).getAttribute('src'),
    ).toContain('download-on-the-mac-app-store-black-en-us.svg');
    expect(storeButtons.length).toBe(1);
    expect(storeButton.getAttribute('href')).toBeNull();
    expect(storeButton.getAttribute('role')).toBe('button');
    expect(storeButton.textContent).toContain('Get it on the Mac App Store');
  });

  it('hides the hero price and keeps seven FAQ answers', () => {
    const requirements = fixture.debugElement.query(
      By.css('app-bookmark-status-hero .bookmark-status-requirements'),
    );
    const requirementText =
      (requirements.nativeElement as HTMLElement).textContent ?? '';
    const details = fixture.debugElement.queryAll(By.css('.questions details'));
    const first = details[0]?.nativeElement as HTMLDetailsElement;
    const second = details[1]?.nativeElement as HTMLDetailsElement;
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(requirementText).not.toContain('Price');
    expect(requirementText).not.toContain('PRICE_TBD');
    expect(details.length).toBe(7);
    expect(first.open).toBe(true);
    expect(second.open).toBe(false);
    expect(text).toContain('PRICE_TBD');
    expect(text.toLowerCase()).not.toContain('icloud');
    expect(text).not.toContain('Your Safari bookmarks, at a glance');
    expect(text).not.toContain('Stop saving the same page twice');
  });

  it('gives title, description, canonical, and JSON-LD without offers', () => {
    const jsonLd = PAGE_SEO.jsonLd as {
      downloadUrl?: string;
      offers?: unknown;
      aggregateRating?: unknown;
    };

    expect(PAGE_SEO.title).toBe(PAGE_TITLE);
    expect(PAGE_SEO.description).toContain('already in your Safari bookmarks');
    expect(PAGE_SEO.canonicalUrl).toBe(
      'https://barooni.dev/apps/safari-bookmark-status',
    );
    expect(jsonLd.downloadUrl).toBe(APP_STORE_URL);
    expect(jsonLd.offers).toBeUndefined();
    expect(jsonLd.aggregateRating).toBeUndefined();
  });

  it('switches screenshot sources with the stored theme', async () => {
    const store = TestBed.inject(AppStore);
    store.initialize();
    store.updateTheme('dark');
    await fixture.whenStable();
    fixture.detectChanges();

    const image = fixture.debugElement.query(
      By.css('.bookmark-status-hero-shot img'),
    );
    const hero = image.nativeElement as HTMLImageElement;

    expect(hero.getAttribute('src')).toContain('hero-tree-dark.webp');
    expect(hero.getAttribute('srcset')).toContain('hero-tree-dark@2x.webp');

    const badge = fixture.debugElement.query(By.css('.store-badge img'));
    const badgeImage = badge.nativeElement as HTMLImageElement;

    expect(badgeImage.getAttribute('src')).toContain(
      'download-on-the-mac-app-store-white-en-us.svg',
    );
  });
});
