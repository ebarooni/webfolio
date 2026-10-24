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

  it('renders the hero headline and placeholder badge', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    const heading = title.nativeElement as HTMLHeadingElement;
    const badge = fixture.debugElement.query(By.css('.bms-badge'));
    const link = badge.nativeElement as HTMLAnchorElement;

    expect(heading.textContent).toContain('Already bookmarked?');
    expect(link.getAttribute('aria-label')).toBe(
      'Download Bookmark Status on the Mac App Store',
    );
    expect(link.getAttribute('href')).toBe('APP_STORE_URL');
  });

  it('does not follow the placeholder store link', () => {
    const badge = fixture.debugElement.query(By.css('.bms-badge'));
    const link = badge.nativeElement as HTMLAnchorElement;
    const event = new MouseEvent('click', { cancelable: true });

    link.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });
});
