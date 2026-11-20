import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RenderMode } from '@angular/ssr';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { pageRoutesOf } from '../../../testing/page-routes';
import { serverRoutes } from '../../app.routes.server';
import { Route } from '../../config/route';
import { CapacitorCalendarPage } from './capacitor-calendar';
import { RESOURCES } from './capacitor-calendar.content';
import { PAGE_SEO, PAGE_TITLE, PAGE_URL } from './capacitor-calendar.seo';
import { FAQ } from './faq/faq.content';

type JsonLdNode = Readonly<{
  '@type': string;
  mainEntity?: readonly unknown[];
  itemListElement?: readonly unknown[];
}>;

describe('CapacitorCalendarPage', () => {
  let fixture: ComponentFixture<CapacitorCalendarPage>;

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent;
  }

  function jsonLdGraph(): JsonLdNode[] {
    return (PAGE_SEO.jsonLd as { '@graph'?: JsonLdNode[] })['@graph'] ?? [];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitorCalendarPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CapacitorCalendarPage);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('registers the lazy route before the wildcard', () => {
    const children = pageRoutesOf('en');
    const pageIndex = children.findIndex(
      (route) => route.path === Route.PLUGINS_CAPACITOR_CALENDAR,
    );
    const wildcardIndex = children.findIndex((route) => route.path === '**');

    expect(pageIndex).toBeGreaterThan(-1);
    expect(pageIndex).toBeLessThan(wildcardIndex);
    expect(children[pageIndex].title).toBe(PAGE_TITLE);
  });

  it('is prerendered in every site language', () => {
    const prerendered = serverRoutes
      .filter((route) => route.renderMode === RenderMode.Prerender)
      .map((route) => route.path);

    expect(prerendered).toEqual(
      expect.arrayContaining([
        Route.PLUGINS_CAPACITOR_CALENDAR,
        `de/${Route.PLUGINS_CAPACITOR_CALENDAR}`,
        `nl/${Route.PLUGINS_CAPACITOR_CALENDAR}`,
      ]),
    );
  });

  it('has one h1 with the value proposition', () => {
    const headings = fixture.debugElement.queryAll(By.css('h1'));

    expect(headings.length).toBe(1);
    expect(
      (headings[0].nativeElement as HTMLHeadingElement).textContent,
    ).toContain('Native calendar events for');
  });

  it('shows the install command, the documentation links and the FAQ', () => {
    const resourceLinks = fixture.debugElement
      .queryAll(By.css('app-capacitor-calendar-resources a'))
      .map((link) => (link.nativeElement as HTMLAnchorElement).href);
    const questions = fixture.debugElement.queryAll(By.css('details'));

    expect(text()).toContain('npm i @ebarooni/capacitor-calendar');
    expect(resourceLinks).toEqual(RESOURCES.map((resource) => resource.href));
    expect(questions.length).toBe(FAQ.length);
  });

  it('states no versions or numbers that change with a plugin release', () => {
    const seoText = JSON.stringify(PAGE_SEO);

    expect(text()).not.toMatch(/\d+k\+|\bv?\d+\.\d+\.\d+\b/);
    expect(seoText).not.toMatch(/\d+k\+|\b\d+\.\d+\.\d+\b/);
  });

  it('gives the title, the English canonical link and structured data', () => {
    const types = jsonLdGraph().map((node) => node['@type']);
    const faqPage = jsonLdGraph().find((node) => node['@type'] === 'FAQPage');

    expect(PAGE_SEO.title).toBe(PAGE_TITLE);
    expect(PAGE_SEO.canonicalUrl).toBe(PAGE_URL);
    expect(PAGE_SEO.alternates).toBeUndefined();
    expect(types).toEqual([
      'WebPage',
      'SoftwareSourceCode',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(faqPage?.mainEntity?.length).toBe(FAQ.length);
  });
});
