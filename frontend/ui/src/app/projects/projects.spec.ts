import { signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { AppStore } from '../store/app/app.store';
import { PROJECTS } from './project-catalog';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;

  function texts(selector: string): string[] {
    return fixture.debugElement
      .queryAll(By.css(selector))
      .map((element) =>
        (element.nativeElement as HTMLElement).textContent.trim(),
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects, localizationTestingModule()],
      providers: [
        provideRouter([]),
        { provide: AppStore, useValue: { theme: signal('light') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
  });

  it('should show the number of projects in the header', () => {
    expect(texts('app-page-header p')[0]).toBe(
      `Work · ${PROJECTS.length} projects`,
    );
    expect(texts('h1')).toEqual(['Things I have built and shipped.']);
  });

  it('should show the featured project once', () => {
    expect(
      fixture.debugElement.queryAll(By.css('app-featured-project')),
    ).toHaveLength(1);
  });

  it('should list every other project by title', () => {
    const titles = PROJECTS.filter(
      (project) => project.id !== 'bookmark-status',
    ).map((project) => project.title);

    const rowTitles = texts('li h3').map((title) =>
      title.replace(/\s*\(.*\)$/, ''),
    );

    expect(rowTitles).toEqual(titles);
  });
});
