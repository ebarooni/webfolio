import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RenderMode } from '@angular/ssr';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  germanTranslation,
  localizationTestingModule,
} from '../../../testing/localization-testing';
import { pageRoutesOf } from '../../../testing/page-routes';
import { serverRoutes } from '../../app.routes.server';
import { languages } from '../../config/languages';
import { Route } from '../../config/route';
import { SiteLanguage } from '../../localization/site-language';
import { CapacitorCalendarPage } from './capacitor-calendar';
import { RESOURCES } from './capacitor-calendar.content';
import { capacitorCalendarSeo } from './capacitor-calendar.seo';
import { FAQ_COPY } from './faq/faq.content';

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

  const URL = 'https://barooni.dev/de/plugins/capacitor-calendar';

  function jsonLdGraph(): JsonLdNode[] {
    const seo = capacitorCalendarSeo('de', URL, 'Titel');

    return (seo.jsonLd as { '@graph'?: JsonLdNode[] })['@graph'] ?? [];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitorCalendarPage, localizationTestingModule()],
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
    expect(children[pageIndex].title).toBe('pageTitles.capacitorCalendar');
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
    expect(questions.length).toBe(FAQ_COPY.en.entries.length);
  });

  it('shows the page in the language of the address', async () => {
    await TestBed.inject(SiteLanguage).activate('de');
    fixture.detectChanges();

    expect(text()).toContain('Native Kalendertermine für');
    expect(text()).toContain(FAQ_COPY.de.entries[0].question);
    expect(germanTranslation.pageTitles.capacitorCalendar).toContain(
      'Capacitor Calendar',
    );
  });

  it('states no versions or numbers that change with a plugin release', async () => {
    for (const language of languages) {
      await TestBed.inject(SiteLanguage).activate(language);
      fixture.detectChanges();

      expect(text()).not.toMatch(/\d+k\+|\bv?\d+\.\d+\.\d+\b/);
      expect(
        JSON.stringify(capacitorCalendarSeo(language, URL, 'Title')),
      ).not.toMatch(/\d+k\+|\b\d+\.\d+\.\d+\b/);
    }
  });

  it('gives structured data in the language of the page', () => {
    const graph = jsonLdGraph();
    const faqPage = graph.find((node) => node['@type'] === 'FAQPage');

    expect(graph.map((node) => node['@type'])).toEqual([
      'WebPage',
      'SoftwareSourceCode',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(graph[0]).toMatchObject({ url: URL, inLanguage: 'de' });
    expect(faqPage?.mainEntity?.length).toBe(FAQ_COPY.de.entries.length);
    expect(faqPage?.mainEntity?.[0]).toMatchObject({
      name: FAQ_COPY.de.entries[0].question,
    });
  });
});
