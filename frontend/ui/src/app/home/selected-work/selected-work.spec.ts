import { signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
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
        { provide: AppStore, useValue: { theme: signal('light') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedWork);
    fixture.detectChanges();
  });

  it('should show the plugin and the app before the other projects', () => {
    const cards = fixture.debugElement
      .queryAll(By.css('app-product-cards a'))
      .map((card) => card.nativeElement as HTMLAnchorElement);

    expect(cards.map((card) => card.getAttribute('href'))).toEqual([
      `/${Route.PLUGINS_CAPACITOR_CALENDAR}`,
      `/${Route.APPS_BOOKMARK_STATUS}`,
    ]);
  });

  it('should link to all projects', () => {
    const allProjects = fixture.debugElement.query(By.css('header a'))
      .nativeElement as HTMLAnchorElement;

    expect(allProjects.getAttribute('href')).toBe(`/${Route.PROJECTS}`);
  });

  it('should show two other projects with their short tag lists', () => {
    const rows = fixture.debugElement
      .queryAll(By.css('app-project-row a'))
      .map((row) => row.nativeElement as HTMLAnchorElement);

    expect(rows.map((row) => row.getAttribute('href'))).toEqual([
      'https://github.com/capawesome-team',
      'https://github.com/ebarooni/webfolio',
    ]);
    expect(rows[0].textContent).toContain('Capacitor · Enterprise');
    expect(rows[1].textContent).toContain('Angular · Tailwind CSS · Quarkus');
  });
});
