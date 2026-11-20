import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import { ProductCards } from './product-cards';

const RELEASE_FACT_PATTERN = /\d+(\.\d+)?k\b|\bv?\d+\.\d+\.\d+\b/i;

describe('ProductCards', () => {
  let fixture: ComponentFixture<ProductCards>;

  function cards(): HTMLAnchorElement[] {
    return fixture.debugElement
      .queryAll(By.css('a'))
      .map((card) => card.nativeElement as HTMLAnchorElement);
  }

  function pressKey(init: KeyboardEventInit): void {
    document.dispatchEvent(new KeyboardEvent('keydown', init));
    fixture.detectChanges();
  }

  function toolbarIcon(): HTMLImageElement {
    return fixture.debugElement.query(By.css('img[src*="toolbar-"]'))
      .nativeElement as HTMLImageElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCards, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCards);
    fixture.detectChanges();
  });

  it('should show the plugin first and the app second', () => {
    expect(cards().map((card) => card.getAttribute('href'))).toEqual([
      `/${Route.PLUGINS_CAPACITOR_CALENDAR}`,
      `/${Route.APPS_BOOKMARK_STATUS}`,
    ]);
    expect(cards()[0].textContent).toContain('Capacitor Calendar');
    expect(cards()[1].textContent).toContain('Bookmark Status');
  });

  it('should load the plugin numbers as live badges', () => {
    const badges = fixture.debugElement
      .queryAll(By.css('img[src^="https://img.shields.io/"]'))
      .map((badge) => badge.nativeElement as HTMLImageElement);

    expect(badges.map((badge) => badge.alt)).toEqual([
      'npm downloads per month',
      'GitHub stars',
    ]);
  });

  it('should not hold numbers that change with a release', () => {
    for (const card of cards()) {
      expect(card.textContent).not.toMatch(RELEASE_FACT_PATTERN);
    }
  });

  it('should turn the toolbar icon blue on the bookmark shortcut', () => {
    expect(toolbarIcon().getAttribute('src')).toContain('toolbar-grey');

    pressKey({ key: 'd', metaKey: true });

    expect(toolbarIcon().getAttribute('src')).toContain('toolbar-blue');
  });
});
