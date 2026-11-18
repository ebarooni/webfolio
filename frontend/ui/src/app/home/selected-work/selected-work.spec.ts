import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import { AppStore } from '../../store/app/app.store';
import { SelectedWork } from './selected-work';

describe('SelectedWork', () => {
  let fixture: ComponentFixture<SelectedWork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedWork, localizationTestingModule()],
      providers: [
        provideRouter([]),
        { provide: AppStore, useValue: { selectTheme$: of('light') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedWork);
    fixture.detectChanges();
  });

  it('should show the featured project', () => {
    const featured = fixture.debugElement.query(
      By.css('app-featured-project a'),
    ).nativeElement as HTMLAnchorElement;

    expect(featured.getAttribute('href')).toBe(
      `/${Route.APPS_BOOKMARK_STATUS}`,
    );
  });

  it('should link to all projects', () => {
    const allProjects = fixture.debugElement.query(By.css('header a'))
      .nativeElement as HTMLAnchorElement;

    expect(allProjects.getAttribute('href')).toBe(`/${Route.PROJECTS}`);
  });

  it('should show two other projects with their short tag lists', () => {
    const rows = fixture.debugElement
      .queryAll(By.css('li a'))
      .map((row) => row.nativeElement as HTMLAnchorElement);

    expect(rows.map((row) => row.getAttribute('href'))).toEqual([
      'https://github.com/ebarooni/capacitor-calendar',
      'https://github.com/capawesome-team',
    ]);
    expect(rows[0].textContent).toContain('Capacitor · iOS · Android');
    expect(rows[1].textContent).toContain('Capacitor · Enterprise');
  });
});
