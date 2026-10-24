import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsHero } from './bms-hero';

describe('BmsHero', () => {
  let fixture: ComponentFixture<BmsHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsHero],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsHero);
    fixture.componentRef.setInput('theme', 'light');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the hero headline and the official badge', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    const heading = title.nativeElement as HTMLHeadingElement;
    const badge = fixture.debugElement.query(By.css('.bms-badge'));
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
    const badge = fixture.debugElement.query(By.css('.bms-badge'));
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
});
