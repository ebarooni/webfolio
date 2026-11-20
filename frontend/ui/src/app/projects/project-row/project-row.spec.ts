import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import { findProject } from '../project-catalog';
import { ProjectRow } from './project-row';

describe('ProjectRow', () => {
  let fixture: ComponentFixture<ProjectRow>;

  function link(): HTMLAnchorElement {
    return fixture.debugElement.query(By.css('a'))
      .nativeElement as HTMLAnchorElement;
  }

  function showProject(id: string): void {
    fixture.componentRef.setInput('project', findProject(id));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRow, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectRow);
  });

  it('should open an external project as a safe link in a new tab', () => {
    showProject('capawesome');

    expect(link().getAttribute('href')).toBe(
      'https://github.com/capawesome-team',
    );
    expect(link().target).toBe('_blank');
    expect(link().rel).toContain('noopener');
    expect(link().textContent).toContain('opens in a new tab');
  });

  it('should open a project with its own page inside the site', () => {
    showProject('capacitor-calendar');

    expect(link().getAttribute('href')).toBe(
      `/${Route.PLUGINS_CAPACITOR_CALENDAR}`,
    );
    expect(link().target).toBe('');
    expect(link().textContent).not.toContain('opens in a new tab');
  });

  it('should show the title, the translated description and the tags', () => {
    showProject('capacitor-calendar');

    expect(link().textContent).toContain('Capacitor Calendar Plugin');
    expect(link().textContent).toContain('Create, update, delete and query');
    expect(link().textContent).toContain('Capacitor · iOS · Android');
  });
});
