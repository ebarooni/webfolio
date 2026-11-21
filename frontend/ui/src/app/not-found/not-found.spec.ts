import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { pageRoutesOf } from '../../testing/page-routes';
import { languages } from '../config/languages';
import { Route } from '../config/route';
import { NotFound } from './not-found';

describe('NotFound', () => {
  let fixture: ComponentFixture<NotFound>;

  function robotsTag(): HTMLMetaElement | null {
    return document.head.querySelector('meta[name="robots"]');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('shows the title and links to the main pages', () => {
    const heading = fixture.debugElement.query(By.css('h1'))
      .nativeElement as HTMLElement;
    const links = fixture.debugElement
      .queryAll(By.css('nav a'))
      .map((link) => (link.nativeElement as HTMLAnchorElement).pathname);

    expect(heading.textContent.trim()).toBe('This page does not exist.');
    expect(links).toEqual(['/', '/projects', '/blog', '/contact']);
  });

  it('keeps search engines from indexing the page while it shows', () => {
    expect(robotsTag()?.content).toBe('noindex');

    fixture.destroy();

    expect(robotsTag()).toBeNull();
  });

  it.each(languages)(
    'is the last page route of the shell in %s',
    (language) => {
      const children = pageRoutesOf(language);
      const last = children[children.length - 1];

      expect(last.path).toBe(Route.NOT_FOUND);
      expect(last.title).toBe('pageTitles.notFound');
    },
  );
});
