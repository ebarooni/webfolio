import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RenderMode } from '@angular/ssr';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { routes } from '../../app.routes';
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
    const script = document.head.querySelector(
      'script[type="application/ld+json"][data-page-seo]',
    );
    const data = JSON.parse(script?.textContent ?? '{}') as {
      '@graph'?: JsonLdNode[];
    };

    return data['@graph'] ?? [];
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
    const children = routes.find((route) => route.path === '')?.children ?? [];
    const pageIndex = children.findIndex(
      (route) => route.path === Route.PLUGINS_CAPACITOR_CALENDAR,
    );
    const wildcardIndex = children.findIndex((route) => route.path === '**');

    expect(pageIndex).toBeGreaterThan(-1);
    expect(pageIndex).toBeLessThan(wildcardIndex);
    expect(children[pageIndex].title).toBe(PAGE_TITLE);
  });

  it('is the only prerendered route', () => {
    const prerendered = serverRoutes.filter(
      (route) => route.renderMode === RenderMode.Prerender,
    );

    expect(prerendered.map((route) => route.path)).toEqual([
      Route.PLUGINS_CAPACITOR_CALENDAR,
    ]);
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

  it('publishes the title, canonical link and structured data', () => {
    const canonical = document.head.querySelector('link[rel="canonical"]');
    const types = jsonLdGraph().map((node) => node['@type']);
    const faqPage = jsonLdGraph().find((node) => node['@type'] === 'FAQPage');

    expect(TestBed.inject(Title).getTitle()).toBe(PAGE_TITLE);
    expect(canonical?.getAttribute('href')).toBe(PAGE_URL);
    expect(types).toEqual([
      'WebPage',
      'SoftwareSourceCode',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(faqPage?.mainEntity?.length).toBe(FAQ.length);
  });

  it('removes its canonical link and structured data when it closes', () => {
    fixture.destroy();

    expect(document.head.querySelector('[data-page-seo]')).toBeNull();
  });
});
