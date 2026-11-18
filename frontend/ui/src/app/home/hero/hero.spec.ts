import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import { HomeHero } from './hero';

describe('HomeHero', () => {
  let fixture: ComponentFixture<HomeHero>;

  function text(selector: string): string {
    const element = fixture.debugElement.query(By.css(selector))
      .nativeElement as HTMLElement;

    return element.textContent.replace(/\s+/g, ' ').trim();
  }

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 12));

    await TestBed.configureTestingModule({
      imports: [HomeHero, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHero);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the headline as one sentence', () => {
    expect(text('h1')).toBe(
      'Hi, I am Ehsan. I build cross-platform apps that feel native.',
    );
  });

  it('should set a platform font on the accent words', () => {
    const accent = fixture.debugElement.query(By.css('h1 span'))
      .nativeElement as HTMLElement;

    expect(accent.textContent.trim()).toBe('feel native');
    expect(accent.style.fontFamily).toBe(
      fixture.componentInstance.accentFontFamily.replaceAll("'", '"'),
    );
  });

  it('should state the years of experience', () => {
    expect(fixture.componentInstance.yearsOfExperience).toBe(5);
    expect(text('h1 + p')).toContain('For 5+ years');
  });

  it('should link to the projects and to the contact screen', () => {
    const links = fixture.debugElement
      .queryAll(By.css('nav a'))
      .map((link) =>
        (link.nativeElement as HTMLAnchorElement).getAttribute('href'),
      );

    expect(links).toEqual([`/${Route.PROJECTS}`, `/${Route.CONTACT}`]);
  });

  it('should render the portrait for small and for large screens', () => {
    const portraits = fixture.debugElement.queryAll(By.css('app-portrait img'));

    expect(portraits).toHaveLength(2);
    expect((portraits[0].nativeElement as HTMLImageElement).alt).toBe(
      'Portrait of Ehsan Barooni',
    );
  });
});
