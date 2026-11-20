import { DestroyRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { PageSeo, type PageSeoConfig } from './page-seo';

const CONFIG: PageSeoConfig = {
  title: 'Page title',
  description: 'Page description with </script> inside',
  canonicalUrl: 'https://example.test/page',
  image: {
    url: 'https://example.test/image.png',
    alt: 'Image',
    width: 1200,
    height: 630,
  },
  jsonLd: { '@type': 'WebPage', name: '</script>' },
};

describe('PageSeo', () => {
  let destroyCallbacks: (() => void)[];
  let destroyRef: DestroyRef;

  function destroy(): void {
    for (const callback of destroyCallbacks) {
      callback();
    }

    destroyCallbacks = [];
  }

  beforeEach(() => {
    destroyCallbacks = [];
    destroyRef = {
      destroyed: false,
      onDestroy: (callback: () => void) => {
        destroyCallbacks.push(callback);
        return () => undefined;
      },
    };

    TestBed.inject(Title).setTitle('Site title');
    TestBed.inject(Meta).updateTag({
      name: 'description',
      content: 'Site description',
    });
  });

  afterEach(() => {
    destroy();
    TestBed.inject(Meta).removeTag('name="description"');
  });

  it('sets the title, the meta tags, the canonical link and JSON-LD', () => {
    TestBed.inject(PageSeo).apply(CONFIG, destroyRef);

    const meta = TestBed.inject(Meta);
    const script = document.head.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(TestBed.inject(Title).getTitle()).toBe('Page title');
    expect(meta.getTag('name="description"')?.content).toBe(CONFIG.description);
    expect(meta.getTag('property="og:url"')?.content).toBe(CONFIG.canonicalUrl);
    expect(meta.getTag('name="twitter:card"')?.content).toBe(
      'summary_large_image',
    );
    expect(
      document.head
        .querySelector('link[rel="canonical"]')
        ?.getAttribute('href'),
    ).toBe(CONFIG.canonicalUrl);
    expect(script?.textContent).not.toContain('</script>');
    expect(JSON.parse(script?.textContent ?? '{}')).toEqual(CONFIG.jsonLd);
  });

  it('never adds a second canonical link when it runs again', () => {
    const seo = TestBed.inject(PageSeo);

    seo.apply(CONFIG, destroyRef);
    seo.apply(CONFIG, destroyRef);

    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(
      1,
    );
  });

  it('restores the site tags when the page closes', () => {
    TestBed.inject(PageSeo).apply(CONFIG, destroyRef);

    destroy();

    const meta = TestBed.inject(Meta);

    expect(TestBed.inject(Title).getTitle()).toBe('Site title');
    expect(meta.getTag('name="description"')?.content).toBe('Site description');
    expect(meta.getTag('property="og:url"')).toBeNull();
    expect(document.head.querySelector('[data-page-seo]')).toBeNull();
  });

  it('restores the site description on a page that was prerendered', () => {
    const meta = TestBed.inject(Meta);
    meta.removeTag('name="description"');
    meta.addTag({
      name: 'description',
      content: CONFIG.description,
      'data-page-seo': '',
      'data-site-content': 'Site description',
    });

    TestBed.inject(PageSeo).apply(CONFIG, destroyRef);
    destroy();

    expect(meta.getTag('name="description"')?.content).toBe('Site description');
  });
});
