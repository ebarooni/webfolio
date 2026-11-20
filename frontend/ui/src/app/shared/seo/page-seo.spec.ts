import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { PageSeo, type PageSeoConfig } from './page-seo';

const CONFIG: PageSeoConfig = {
  title: 'Page title',
  description: 'Page description with </script> inside',
  canonicalUrl: 'https://example.test/de/page',
  image: {
    url: 'https://example.test/image.png',
    alt: 'Image',
    width: 1200,
    height: 630,
  },
  jsonLd: { '@type': 'WebPage', name: '</script>' },
  locale: 'de_DE',
  alternateLocales: ['en_US', 'nl_NL'],
  alternates: [
    { hreflang: 'en', href: 'https://example.test/page' },
    { hreflang: 'de', href: 'https://example.test/de/page' },
    { hreflang: 'x-default', href: 'https://example.test/page' },
  ],
};

describe('PageSeo', () => {
  function headElements(selector: string): Element[] {
    return Array.from(document.head.querySelectorAll(selector));
  }

  beforeEach(() => {
    TestBed.inject(Title).setTitle('Site title');
    TestBed.inject(Meta).updateTag({
      name: 'description',
      content: 'Site description',
    });
  });

  afterEach(() => {
    for (const element of headElements('[data-page-seo]')) {
      element.remove();
    }

    TestBed.inject(Meta).removeTag('name="description"');
  });

  it('sets the title, the meta tags, the canonical link and JSON-LD', () => {
    TestBed.inject(PageSeo).apply(CONFIG);

    const meta = TestBed.inject(Meta);
    const script = document.head.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(TestBed.inject(Title).getTitle()).toBe('Page title');
    expect(meta.getTag('name="description"')?.content).toBe(CONFIG.description);
    expect(meta.getTag('property="og:url"')?.content).toBe(CONFIG.canonicalUrl);
    expect(meta.getTag('property="og:locale"')?.content).toBe('de_DE');
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
    expect(meta.getTag('name="twitter:card"')?.content).toBe(
      'summary_large_image',
    );
    expect(
      headElements('link[rel="canonical"]').map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual([CONFIG.canonicalUrl]);
    expect(script?.textContent).not.toContain('</script>');
    expect(JSON.parse(script?.textContent ?? '{}')).toEqual(CONFIG.jsonLd);
  });

  it('adds one hreflang link per language version and the other locales', () => {
    TestBed.inject(PageSeo).apply(CONFIG);

    expect(
      headElements('link[rel="alternate"]').map((link) => [
        link.getAttribute('hreflang'),
        link.getAttribute('href'),
      ]),
    ).toEqual(
      CONFIG.alternates?.map((alternate) => [
        alternate.hreflang,
        alternate.href,
      ]),
    );
    expect(
      headElements('meta[property="og:locale:alternate"]').map((tag) =>
        tag.getAttribute('content'),
      ),
    ).toEqual(['en_US', 'nl_NL']);
  });

  it('replaces the tags of the page before and of index.html', () => {
    const seo = TestBed.inject(PageSeo);

    seo.apply(CONFIG);
    seo.apply({
      ...CONFIG,
      canonicalUrl: 'https://example.test/other',
      alternates: [],
      alternateLocales: [],
    });

    expect(headElements('link[rel="canonical"]').length).toBe(1);
    expect(headElements('link[rel="alternate"]').length).toBe(0);
    expect(headElements('meta[name="description"]').length).toBe(1);
    expect(headElements('meta[property="og:locale:alternate"]').length).toBe(0);
    expect(headElements('script[type="application/ld+json"]').length).toBe(1);
  });

  it('asks search engines not to list a hidden page', () => {
    TestBed.inject(PageSeo).apply({ ...CONFIG, noIndex: true });

    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe(
      'noindex',
    );
  });

  it('uses the shorter link preview texts when the page has them', () => {
    TestBed.inject(PageSeo).apply({
      ...CONFIG,
      social: { title: 'Short title', description: 'Short description' },
      type: 'article',
    });

    const meta = TestBed.inject(Meta);

    expect(meta.getTag('property="og:title"')?.content).toBe('Short title');
    expect(meta.getTag('name="twitter:description"')?.content).toBe(
      'Short description',
    );
    expect(meta.getTag('property="og:type"')?.content).toBe('article');
    expect(meta.getTag('name="description"')?.content).toBe(CONFIG.description);
  });
});
