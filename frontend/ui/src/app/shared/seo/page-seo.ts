import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

export type PageSeoImage = Readonly<{
  url: string;
  alt: string;
  width: number;
  height: number;
}>;

/** One language version of a page, for the hreflang links. */
export type PageAlternate = Readonly<{ hreflang: string; href: string }>;

export type PageSeoConfig = Readonly<{
  title: string;
  description: string;
  canonicalUrl: string;
  image: PageSeoImage;
  jsonLd: object;
  /** The Open Graph locale, for example "de_DE". */
  locale?: string;
  /** The Open Graph locales of the other language versions. */
  alternateLocales?: readonly string[];
  /** Every language version of the page, also this one, and x-default. */
  alternates?: readonly PageAlternate[];
  /** Shorter texts for link previews. The page title and description are the default. */
  social?: Readonly<{ title: string; description: string }>;
  /** The Open Graph type. "website" is the default. */
  type?: 'website' | 'article';
  /** True for pages that search engines must not list, such as "not found". */
  noIndex?: boolean;
}>;

const OWNER_ATTRIBUTE = 'data-page-seo';

type MetaTag = Readonly<{
  attribute: 'name' | 'property';
  key: string;
  content: string;
}>;

/**
 * Writes the title, description, canonical and hreflang links, Open Graph
 * and Twitter tags, and JSON-LD of the page on the screen. Each call
 * replaces all tags of the call before, so a page never has two of them.
 * During prerendering the tags go into the static HTML.
 */
@Injectable({ providedIn: 'root' })
export class PageSeo {
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  apply(config: PageSeoConfig): void {
    const head = this.document.head;
    const tags = metaTags(config);

    // The site tags in index.html and the tags of the last page go first.
    for (const stale of head.querySelectorAll(`[${OWNER_ATTRIBUTE}]`)) {
      stale.remove();
    }

    for (const tag of tags) {
      for (const existing of head.querySelectorAll(
        `meta[${tag.attribute}="${tag.key}"]`,
      )) {
        existing.remove();
      }
    }

    this.title.setTitle(config.title);

    for (const tag of tags) {
      this.append('meta', {
        [tag.attribute]: tag.key,
        content: tag.content,
      });
    }

    this.append('link', { rel: 'canonical', href: config.canonicalUrl });

    for (const alternate of config.alternates ?? []) {
      this.append('link', {
        rel: 'alternate',
        hreflang: alternate.hreflang,
        href: alternate.href,
      });
    }

    const jsonLd = this.append('script', { type: 'application/ld+json' });
    jsonLd.textContent = serializeJsonLd(config.jsonLd);
  }

  private append(
    tagName: 'meta' | 'link' | 'script',
    attributes: Readonly<Record<string, string>>,
  ): HTMLElement {
    const element = this.document.createElement(tagName);

    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, value);
    }

    element.setAttribute(OWNER_ATTRIBUTE, '');
    this.document.head.appendChild(element);

    return element;
  }
}

function metaTags(config: PageSeoConfig): MetaTag[] {
  const socialTitle = config.social?.title ?? config.title;
  const socialDescription = config.social?.description ?? config.description;

  const tags: [MetaTag['attribute'], string, string][] = [
    ['name', 'description', config.description],
    ['name', 'robots', config.noIndex ? 'noindex' : 'index, follow'],
    ['property', 'og:type', config.type ?? 'website'],
    ['property', 'og:site_name', 'Ehsan Barooni'],
    ['property', 'og:title', socialTitle],
    ['property', 'og:description', socialDescription],
    ['property', 'og:url', config.canonicalUrl],
    ['property', 'og:locale', config.locale ?? 'en_US'],
    ...(config.alternateLocales ?? []).map(
      (locale): [MetaTag['attribute'], string, string] => [
        'property',
        'og:locale:alternate',
        locale,
      ],
    ),
    ['property', 'og:image', config.image.url],
    ['property', 'og:image:width', String(config.image.width)],
    ['property', 'og:image:height', String(config.image.height)],
    ['property', 'og:image:alt', config.image.alt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', socialTitle],
    ['name', 'twitter:description', socialDescription],
    ['name', 'twitter:image', config.image.url],
    ['name', 'twitter:image:alt', config.image.alt],
  ];

  return tags.map(([attribute, key, content]) => ({ attribute, key, content }));
}

// "<" in a string value must not close the script element early.
function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
