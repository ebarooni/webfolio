import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import type { Theme } from '../../config/themes-array';
import { AppStore } from '../../store/app/app.store';
import { SelectedWork } from './selected-work';

describe('SelectedWork', () => {
  let fixture: ComponentFixture<SelectedWork>;
  let themeSubject: BehaviorSubject<Theme>;

  function image(selector: string): HTMLImageElement {
    return fixture.debugElement.query(By.css(selector))
      .nativeElement as HTMLImageElement;
  }

  function pressKey(init: KeyboardEventInit): void {
    document.dispatchEvent(new KeyboardEvent('keydown', init));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    themeSubject = new BehaviorSubject<Theme>('light');

    await TestBed.configureTestingModule({
      imports: [SelectedWork, localizationTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: AppStore,
          useValue: { selectTheme$: themeSubject.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedWork);
    fixture.detectChanges();
  });

  it('should link the featured project to its own screen', () => {
    const featured = fixture.debugElement.query(By.css('section > a'))
      .nativeElement as HTMLAnchorElement;

    expect(featured.getAttribute('href')).toBe(
      `/${Route.APPS_BOOKMARK_STATUS}`,
    );
    expect(featured.textContent).toContain('Bookmark Status');
  });

  it('should link to all projects', () => {
    const allProjects = fixture.debugElement.query(By.css('header a'))
      .nativeElement as HTMLAnchorElement;

    expect(allProjects.getAttribute('href')).toBe(`/${Route.PROJECTS}`);
  });

  it('should render the other projects as safe external links', () => {
    const rows = fixture.debugElement
      .queryAll(By.css('li a'))
      .map((row) => row.nativeElement as HTMLAnchorElement);

    expect(rows.map((row) => row.getAttribute('href'))).toEqual([
      'https://github.com/ebarooni/capacitor-calendar',
      'https://github.com/capawesome-team',
    ]);
    expect(rows[0].textContent).toContain('Create, update, delete and query');
    expect(rows[0].rel).toContain('noopener');
  });

  it.each(['light', 'dark'] as const)(
    'should show the %s screenshot for the %s theme',
    (theme) => {
      themeSubject.next(theme);
      fixture.detectChanges();

      expect(image('section > a > img').getAttribute('src')).toBe(
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
