import { DestroyRef, DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export type PageSeoConfig = Readonly<{
  title: string;
  description: string;
  canonicalUrl: string;
  image: Readonly<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  jsonLd: object;
}>;

const OWNER_ATTRIBUTE = 'data-page-seo';
const SITE_CONTENT_ATTRIBUTE = 'data-site-content';

type MetaKey = Readonly<{ attribute: 'name' | 'property'; key: string }>;

type PreviousMeta = MetaKey & Readonly<{ content: string | null }>;

/**
 * Gives one page its own title, description, canonical link, Open Graph
 * and Twitter tags, and JSON-LD. During prerendering the tags go into the
 * static HTML. When the page closes, the tags of the site come back.
 */
@Injectable({ providedIn: 'root' })
export class PageSeo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(config: PageSeoConfig, destroyRef: DestroyRef): void {
    const previousTitle = this.title.getTitle();
    const previousMeta = metaTags(config).map((tag) => this.setMeta(tag));
    const head = this.document.head;

    // The prerendered HTML already has the elements. The browser replaces
    // them, so that the page never has two of them.
    for (const stale of head.querySelectorAll(
      `link[${OWNER_ATTRIBUTE}], script[${OWNER_ATTRIBUTE}]`,
    )) {
      stale.remove();
    }

    const canonical = this.document.createElement('link');
    canonical.setAttribute(OWNER_ATTRIBUTE, '');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', config.canonicalUrl);
    head.appendChild(canonical);

    const jsonLd = this.document.createElement('script');
    jsonLd.setAttribute(OWNER_ATTRIBUTE, '');
    jsonLd.setAttribute('type', 'application/ld+json');
    jsonLd.textContent = serializeJsonLd(config.jsonLd);
    head.appendChild(jsonLd);

    this.title.setTitle(config.title);

    destroyRef.onDestroy(() => {
      canonical.remove();
      jsonLd.remove();
      this.title.setTitle(previousTitle);

      for (const tag of previousMeta) {
        this.restoreMeta(tag);
      }
    });
  }

  private setMeta(tag: MetaKey & { content: string }): PreviousMeta {
    const selector = `${tag.attribute}="${tag.key}"`;
    const existing = this.meta.getTag(selector);

    // A prerendered page already has its own tag. That tag keeps the
    // value of the site, so the browser can restore it later.
    const siteContent = existing?.hasAttribute(OWNER_ATTRIBUTE)
      ? existing.getAttribute(SITE_CONTENT_ATTRIBUTE)
      : (existing?.content ?? null);

    this.meta.removeTag(selector);
    this.meta.addTag({
      ...definition(tag.attribute, tag.key, tag.content),
      [OWNER_ATTRIBUTE]: '',
      ...(siteContent === null
        ? {}
        : { [SITE_CONTENT_ATTRIBUTE]: siteContent }),
    });

    return { attribute: tag.attribute, key: tag.key, content: siteContent };
  }

  private restoreMeta(tag: PreviousMeta): void {
    this.meta.removeTag(`${tag.attribute}="${tag.key}"`);

    if (tag.content !== null) {
      this.meta.addTag(definition(tag.attribute, tag.key, tag.content));
    }
  }
}

function definition(
  attribute: MetaKey['attribute'],
  key: string,
  content: string,
): MetaDefinition {
  return attribute === 'name'
    ? { name: key, content }
    : { property: key, content };
}

function metaTags(config: PageSeoConfig): (MetaKey & { content: string })[] {
  const tags: [MetaKey['attribute'], string, string][] = [
    ['name', 'description', config.description],
    ['property', 'og:type', 'website'],
    ['property', 'og:title', config.title],
    ['property', 'og:description', config.description],
    ['property', 'og:url', config.canonicalUrl],
    ['property', 'og:image', config.image.url],
    ['property', 'og:image:width', String(config.image.width)],
    ['property', 'og:image:height', String(config.image.height)],
    ['property', 'og:image:alt', config.image.alt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', config.title],
    ['name', 'twitter:description', config.description],
    ['name', 'twitter:image', config.image.url],
    ['name', 'twitter:image:alt', config.image.alt],
  ];

  return tags.map(([attribute, key, content]) => ({ attribute, key, content }));
}

// "<" in a string value must not close the script element early.
function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
