import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  NavigationEnd,
  provideRouter,
  Router,
  withInMemoryScrolling,
} from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Route } from '../../../config/route';
import { BookmarkStatusHero } from './hero';

@Component({
  selector: 'app-route-host',
  template: '',
})
class RouteHost {}

function nextNavigation(router: Router): Promise<NavigationEnd> {
  return firstValueFrom(
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ),
  );
}

describe('BookmarkStatusHero', () => {
  let fixture: ComponentFixture<BookmarkStatusHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkStatusHero],
      providers: [
        provideRouter(
          [
            { path: Route.HOME, component: RouteHost },
            { path: Route.APPS_BOOKMARK_STATUS, component: RouteHost },
          ],
          withInMemoryScrolling({
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
          }),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkStatusHero);
    fixture.componentRef.setInput('theme', 'light');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the hero headline and the official badge', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    const heading = title.nativeElement as HTMLHeadingElement;
    const badge = fixture.debugElement.query(By.css('.store-badge'));
    const link = badge.nativeElement as HTMLAnchorElement;
    const image = badge.query(By.css('img'));
    const badgeImage = image.nativeElement as HTMLImageElement;

    expect(heading.textContent).toContain('Already bookmarked?');
    expect(link.getAttribute('aria-label')).toBe(
      'Download Bookmark Status on the Mac App Store',
    );
    expect(link.getAttribute('href')).toBeNull();
    expect(link.getAttribute('role')).toBe('button');
    expect(badgeImage.getAttribute('src')).toContain(
      'download-on-the-mac-app-store-black-en-us.svg',
    );
    expect(link.textContent).not.toContain('Official Apple badge goes here');

    fixture.componentRef.setInput('theme', 'dark');
    fixture.detectChanges();

    expect(badgeImage.getAttribute('src')).toContain(
      'download-on-the-mac-app-store-white-en-us.svg',
    );
  });

  it('does not follow the placeholder store link', () => {
    const badge = fixture.debugElement.query(By.css('.store-badge'));
    const link = badge.nativeElement as HTMLAnchorElement;
    const click = new MouseEvent('click', { cancelable: true });
    const auxClick = new MouseEvent('auxclick', { cancelable: true });
    const keydown = new KeyboardEvent('keydown', {
      key: 'Enter',
      cancelable: true,
    });

    link.dispatchEvent(click);
    link.dispatchEvent(auxClick);
    link.dispatchEvent(keydown);

    expect(click.defaultPrevented).toBe(true);
    expect(auxClick.defaultPrevented).toBe(true);
    expect(keydown.defaultPrevented).toBe(true);
  });

  it('scrolls to how it works on this page', async () => {
    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);
    const link = fixture.debugElement.query(By.css('a.ghost-button'));
    const anchor = link.nativeElement as HTMLAnchorElement;
    const page = `/${Route.APPS_BOOKMARK_STATUS}`;

    await router.navigateByUrl(page);

    expect(anchor.textContent).toContain('See how it works');
    expect(anchor.getAttribute('href')).toBe(`${page}#how`);

    const toSection = nextNavigation(router);
    anchor.click();
    await toSection;

    expect(router.url).toBe(`${page}#how`);
    expect(location.path(true)).toBe(`${page}#how`);
    expect(router.url).not.toBe('/');
    expect(router.url).not.toBe('/#how');
  });
});
