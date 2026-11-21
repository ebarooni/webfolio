import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { Route } from '../config/route';
import { Privacy, PRIVACY_SECTIONS } from './privacy';

describe('Privacy', () => {
  let fixture: ComponentFixture<Privacy>;

  function text(selector: string): string[] {
    return fixture.debugElement
      .queryAll(By.css(selector))
      .map((element) =>
        (element.nativeElement as HTMLElement).textContent
          .replace(/\s+/g, ' ')
          .trim(),
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Privacy, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Privacy);
    fixture.detectChanges();
  });

  it('should show the headline of the screen', () => {
    expect(text('h1')).toEqual(['What this site knows about you.']);
  });

  it('should show one titled section for each topic', () => {
    const titles = text('section h2');

    expect(titles).toHaveLength(PRIVACY_SECTIONS.length);
    expect(titles).toContain('Visit statistics');
    expect(titles).toContain('Contact form');
    expect(titles.every((title) => !title.includes('.title'))).toBe(true);
  });

  it('should label each section by its title', () => {
    for (const section of fixture.debugElement.queryAll(By.css('section'))) {
      const labelId = section.attributes['aria-labelledby'];

      expect(section.query(By.css(`h2#${labelId}`))).not.toBeNull();
    }
  });

  it('should say that the statistics use no cookies', () => {
    expect(text('section p').join(' ')).toContain('sets no cookies');
  });

  it('should link to the contact form for questions about data', () => {
    const links = fixture.debugElement
      .queryAll(By.css(`a[href="/${Route.CONTACT}"]`))
      .map((link) => link.nativeElement as HTMLAnchorElement);

    expect(links.length).toBeGreaterThan(0);
  });

  it('should show the date of the last change', () => {
    expect(text('p.meta-label')).toContain('Last updated: 21 November 2026');
  });
});
