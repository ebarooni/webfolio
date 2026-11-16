import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { findProject } from '../project-catalog';
import { ProjectRow } from './project-row';

describe('ProjectRow', () => {
  let fixture: ComponentFixture<ProjectRow>;

  function link(): HTMLAnchorElement {
    return fixture.debugElement.query(By.css('a'))
      .nativeElement as HTMLAnchorElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRow, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectRow);
    fixture.componentRef.setInput('project', findProject('capacitor-calendar'));
    fixture.detectChanges();
  });

  it('should open the project as a safe external link', () => {
    expect(link().getAttribute('href')).toBe(
      'https://github.com/ebarooni/capacitor-calendar',
    );
    expect(link().target).toBe('_blank');
    expect(link().rel).toContain('noopener');
  });

  it('should show the title, the translated description and the tags', () => {
    expect(link().textContent).toContain('Capacitor Calendar Plugin');
    expect(link().textContent).toContain('Create, update, delete and query');
    expect(link().textContent).toContain('Capacitor · iOS · Android');
  });

  it('should tell screen readers that the link opens a new tab', () => {
    expect(link().textContent).toContain('opens in a new tab');
  });
});
