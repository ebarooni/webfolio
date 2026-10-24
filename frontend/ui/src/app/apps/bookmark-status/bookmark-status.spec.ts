import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Route } from '../../config/route';
import { AppStore } from '../../store/app/app.store';
import { routes } from '../../app.routes';
import { BookmarkStatusPage } from './bookmark-status';
import { APP_STORE_URL, PAGE_TITLE } from './bookmark-status.copy';

describe('BookmarkStatusPage', () => {
  let fixture: ComponentFixture<BookmarkStatusPage>;
  let component: BookmarkStatusPage;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [BookmarkStatusPage],
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
    const shell = routes.find((route) => route.path === '');
    const children = shell?.children ?? [];
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
      footerBgClass: 'bg-base-100',
    });
    expect(pageIndex).toBeGreaterThan(-1);
    expect(pageIndex).toBeLessThan(wildcardIndex);
  });

  it('renders the final headline, one badge, and a text store button', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    const title = heading.nativeElement as HTMLHeadingElement;
    const badges = fixture.debugElement.queryAll(By.css('.bms-badge'));
    const storeButtons = fixture.debugElement.queryAll(By.css('.bms-btn-store'));
    const storeButton = storeButtons[0]?.nativeElement as HTMLAnchorElement;

    expect(fixture.debugElement.queryAll(By.css('h1')).length).toBe(1);
    expect(title.textContent).toContain('Already bookmarked?');
    expect(title.textContent).toContain('Now you’ll know.');
    expect(badges.length).toBe(1);
    expect(storeButtons.length).toBe(1);
    expect(storeButton.getAttribute('href')).toBe(APP_STORE_URL);
    expect(storeButton.textContent).toContain('Get it on the Mac App Store');
  });

  it('hides the hero price and keeps seven FAQ answers', () => {
    const requirements = fixture.debugElement.query(By.css('.bms-hero .bms-reqs'));
    const requirementText = (requirements.nativeElement as HTMLElement).textContent ?? '';
    const details = fixture.debugElement.queryAll(By.css('.bms-faq details'));
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

  it('publishes title, description, canonical, and JSON-LD without offers', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    const description = meta.getTag('name="description"');
    const canonical = document.querySelector('link[rel="canonical"]');
    const script = document.querySelector('script[type="application/ld+json"]');
    const jsonLd = JSON.parse(script?.textContent ?? '{}') as {
      downloadUrl?: string;
      offers?: unknown;
      aggregateRating?: unknown;
    };

    expect(title.getTitle()).toBe(PAGE_TITLE);
    expect(description?.content).toContain('already in your Safari bookmarks');
    expect(canonical?.getAttribute('href')).toBe(
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

    const image = fixture.debugElement.query(By.css('.bms-hero-shot img'));
    const hero = image.nativeElement as HTMLImageElement;

    expect(hero.getAttribute('src')).toContain('hero-tree-dark.webp');
    expect(hero.getAttribute('srcset')).toContain('hero-tree-dark@2x.webp');
  });
});
