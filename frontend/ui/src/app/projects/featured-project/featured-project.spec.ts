import { signal, type WritableSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import type { Theme } from '../../config/themes-array';
import { AppStore } from '../../store/app/app.store';
import { FeaturedProject } from './featured-project';

describe('FeaturedProject', () => {
  let fixture: ComponentFixture<FeaturedProject>;
  let currentTheme: WritableSignal<Theme>;

  function image(selector: string): HTMLImageElement {
    return fixture.debugElement.query(By.css(selector))
      .nativeElement as HTMLImageElement;
  }

  function pressKey(init: KeyboardEventInit): void {
    document.dispatchEvent(new KeyboardEvent('keydown', init));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    currentTheme = signal<Theme>('light');

    await TestBed.configureTestingModule({
      imports: [FeaturedProject, localizationTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: AppStore,
          useValue: { theme: currentTheme },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProject);
    fixture.detectChanges();
  });

  it('should link the featured project to its own screen', () => {
    const featured = fixture.debugElement.query(By.css('a'))
      .nativeElement as HTMLAnchorElement;

    expect(featured.getAttribute('href')).toBe(
      `/${Route.APPS_BOOKMARK_STATUS}`,
    );
    expect(featured.textContent).toContain('Bookmark Status');
  });

  it.each(['light', 'dark'] as const)(
    'should show the %s screenshot for the %s theme',
    (theme) => {
      currentTheme.set(theme);
      fixture.detectChanges();

      expect(image('a > img').getAttribute('src')).toBe(
        `apps/safari-bookmark-status/shots/hero-tree-${theme}@2x.webp`,
      );
    },
  );

  it.each([
    { name: 'Command and D', init: { key: 'd', metaKey: true }, color: 'blue' },
    { name: 'Control and D', init: { key: 'D', ctrlKey: true }, color: 'blue' },
    { name: 'D alone', init: { key: 'd' }, color: 'grey' },
    { name: 'Control and S', init: { key: 's', ctrlKey: true }, color: 'grey' },
  ])('should show the $color toolbar button after $name', ({ init, color }) => {
    pressKey(init);

    expect(image('article p img').getAttribute('src')).toContain(
      `toolbar-${color}-32.png`,
    );
  });
});
