import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { provideRouter, Router, Routes, TitleStrategy } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { BLOG_POSTS } from '../../blog/post-catalog';
import { Language } from '../../config/languages';
import { LocalizedTitleStrategy } from '../../localization/localized-title-strategy';
import {
  activateLanguage,
  LANGUAGE_DATA_KEY,
} from '../../localization/site-language';
import { SEO_DATA_KEY } from './route-seo';

@Component({ template: '' })
class EmptyPage {}

function landingSeo(language: Language, url: string, title: string) {
  return {
    description: `Landing ${language}`,
    image: { url: 'https://barooni.dev/x.png', alt: 'X', width: 1, height: 1 },
    jsonLd: { '@type': 'WebPage', url, name: title },
  };
}

function pages(): Routes {
  return [
    {
      path: 'projects',
      component: EmptyPage,
      title: 'pageTitles.projects',
      data: { [SEO_DATA_KEY]: { kind: 'page', key: 'projects' } },
    },
    {
      path: 'blog/:slug',
      component: EmptyPage,
      title: 'pageTitles.post',
      data: { [SEO_DATA_KEY]: { kind: 'post' } },
    },
    {
      path: 'landing',
      component: EmptyPage,
      title: 'pageTitles.capacitorCalendar',
      data: { [SEO_DATA_KEY]: { kind: 'landing', seo: landingSeo } },
    },
    {
      path: '**',
      component: EmptyPage,
      title: 'pageTitles.notFound',
      data: { [SEO_DATA_KEY]: { kind: 'hidden' } },
    },
  ];
}

function languageRoute(language: Language, path: string): Routes[number] {
  return {
    path,
    canActivate: [activateLanguage(language)],
    data: { [LANGUAGE_DATA_KEY]: language },
    children: pages(),
  };
}

describe('RouteSeoWriter', () => {
  function head(selector: string, attribute: string): (string | null)[] {
    return Array.from(document.head.querySelectorAll(selector), (element) =>
      element.getAttribute(attribute),
    );
  }

  async function open(url: string): Promise<void> {
    await TestBed.inject(Router).navigateByUrl(url);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [localizationTestingModule()],
      providers: [
        provideRouter([
          languageRoute('de', 'de'),
          languageRoute('nl', 'nl'),
          languageRoute('en', ''),
        ]),
        { provide: TitleStrategy, useClass: LocalizedTitleStrategy },
      ],
    });
  });

  afterEach(() => {
    for (const element of document.head.querySelectorAll('[data-page-seo]')) {
      element.remove();
    }
  });

  it('writes a canonical link to the language version on the screen', async () => {
    await open('/de/projects');

    expect(head('link[rel="canonical"]', 'href')).toEqual([
      'https://barooni.dev/de/projects',
    ]);
    expect(document.title).toBe('Projekte | Ehsan Barooni');
    expect(document.documentElement.lang).toBe('de');
    expect(TestBed.inject(Meta).getTag('property="og:locale"')?.content).toBe(
      'de_DE',
    );
  });

  it('links every language version and x-default with hreflang', async () => {
    await open('/nl/projects');

    expect(
      Array.from(
        document.head.querySelectorAll('link[rel="alternate"]'),
        (link) => [link.getAttribute('hreflang'), link.getAttribute('href')],
      ),
    ).toEqual([
      ['en', 'https://barooni.dev/projects'],
      ['de', 'https://barooni.dev/de/projects'],
      ['nl', 'https://barooni.dev/nl/projects'],
      ['x-default', 'https://barooni.dev/projects'],
    ]);
  });

  it('writes the description and JSON-LD in the language of the page', async () => {
    await open('/de/projects');

    const jsonLd = JSON.parse(
      document.head.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? '{}',
    ) as { '@graph': { '@type': string; inLanguage?: unknown }[] };

    expect(
      TestBed.inject(Meta).getTag('name="description"')?.content,
    ).toContain('Ausgewählte Projekte');
    expect(jsonLd['@graph'][0]).toMatchObject({
      '@type': 'CollectionPage',
      inLanguage: 'de',
    });
  });

  it('describes a blog post as an article in its language', async () => {
    const post = BLOG_POSTS[0];

    await open(`/nl/blog/${post.slug}`);

    const jsonLd = JSON.parse(
      document.head.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? '{}',
    ) as { '@graph': { '@type': string; inLanguage?: unknown }[] };

    expect(TestBed.inject(Meta).getTag('property="og:type"')?.content).toBe(
      'article',
    );
    expect(jsonLd['@graph'][0]).toMatchObject({
      '@type': 'BlogPosting',
      inLanguage: 'nl',
    });
  });

  it('gives a landing page its texts and links in each language', async () => {
    await open('/nl/landing');

    const jsonLd = JSON.parse(
      document.head.querySelector('script[type="application/ld+json"]')
        ?.textContent ?? '{}',
    ) as { url?: string; name?: string };

    expect(head('link[rel="canonical"]', 'href')).toEqual([
      'https://barooni.dev/nl/landing',
    ]);
    expect(head('link[rel="alternate"]', 'href')).toEqual([
      'https://barooni.dev/landing',
      'https://barooni.dev/de/landing',
      'https://barooni.dev/nl/landing',
      'https://barooni.dev/landing',
    ]);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(
      'Landing nl',
    );
    expect(jsonLd).toMatchObject({
      url: 'https://barooni.dev/nl/landing',
      name: document.title,
    });
  });

  it('asks search engines not to list an unknown page', async () => {
    await open('/de/unknown');

    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe(
      'noindex',
    );
    expect(head('link[rel="alternate"]', 'href')).toEqual([]);
  });
});
