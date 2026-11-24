import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { findPostBySlug } from '../../blog/post-catalog';
import { DEFAULT_LANGUAGE, Language, languages } from '../../config/languages';
import { OPEN_GRAPH_LOCALES, SITE_IMAGE, SITE_URL } from '../../config/site';
import { SOCIAL_LINKS } from '../../config/social-links';
import {
  localizedUrl,
  splitLanguagePrefix,
} from '../../localization/localized-path';
import { languageOfRoute } from '../../localization/site-language';
import { PageAlternate, PageSeo, PageSeoConfig } from './page-seo';

/** The key of the route data that says how the page appears in search. */
export const SEO_DATA_KEY = 'seo';

/** A page with a description under "seo.description.<key>". */
export type SeoPageKey =
  'home' | 'blog' | 'projects' | 'contact' | 'buildInfo' | 'privacy';

export type RouteSeo =
  | Readonly<{ kind: 'page'; key: SeoPageKey; noIndex?: boolean }>
  | Readonly<{ kind: 'post' }>
  // A landing page with its own texts in every language, see LandingSeo.
  | Readonly<{ kind: 'landing'; seo: LandingSeoFactory }>
  // Search engines must not list the page, for example "not found".
  | Readonly<{ kind: 'hidden' }>;

/**
 * The head tags of a landing page in one language, besides the title, the
 * canonical link, the locales and the hreflang links. The writer adds
 * those. The url is the canonical address, for the ids in JSON-LD, and
 * the title is the translated page title.
 */
export type LandingSeo = Pick<
  PageSeoConfig,
  'description' | 'image' | 'jsonLd' | 'social'
>;

export type LandingSeoFactory = (
  language: Language,
  url: string,
  title: string,
) => LandingSeo;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const PAGE_TYPES: Readonly<Record<SeoPageKey, string>> = {
  blog: 'CollectionPage',
  buildInfo: 'WebPage',
  contact: 'ContactPage',
  home: 'ProfilePage',
  privacy: 'WebPage',
  projects: 'CollectionPage',
};

function deepestChild(root: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let snapshot = root;

  while (snapshot.firstChild) {
    snapshot = snapshot.firstChild;
  }

  return snapshot;
}

function alternatesOf(
  path: string,
  available: readonly Language[],
): PageAlternate[] {
  return [
    ...available.map((language) => ({
      hreflang: language,
      href: localizedUrl(path, language),
    })),
    { hreflang: 'x-default', href: localizedUrl(path, DEFAULT_LANGUAGE) },
  ];
}

/**
 * Builds the head tags of a page from its route: the title and description
 * in the language of the address, a canonical link to this language
 * version, hreflang links to all versions, and JSON-LD.
 */
@Injectable({ providedIn: 'root' })
export class RouteSeoWriter {
  private readonly pageSeo = inject(PageSeo);
  private readonly translocoService = inject(TranslocoService);

  write(state: RouterStateSnapshot, title: string): void {
    const page = deepestChild(state.root);
    const routeSeo = page.data[SEO_DATA_KEY] as RouteSeo | undefined;
    const language = languageOfRoute(page);
    const { path } = splitLanguagePrefix(state.url);

    if (!routeSeo) {
      return;
    }

    switch (routeSeo.kind) {
      case 'landing':
        this.pageSeo.apply(this.landing(routeSeo.seo, path, language, title));
        return;
      case 'hidden':
        this.pageSeo.apply({
          ...this.translatedPage(path, language, title, [language]),
          alternates: [],
          jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage' },
          noIndex: true,
        });
        return;
      case 'post':
        this.pageSeo.apply(this.post(page, path, language, title));
        return;
      case 'page':
        this.pageSeo.apply(this.page(routeSeo, path, language, title));
        return;
    }
  }

  private translate(key: string, language: Language): string {
    return this.translocoService.translate(key, {}, language);
  }

  private translatedPage(
    path: string,
    language: Language,
    title: string,
    available: readonly Language[],
    description = this.translate('seo.description.home', language),
  ): PageSeoConfig & { jsonLd: Record<string, unknown> } {
    const canonicalUrl = localizedUrl(path, language);

    return {
      title,
      description,
      canonicalUrl,
      image: {
        ...SITE_IMAGE,
        alt: this.translate('seo.imageAlt', language),
      },
      locale: OPEN_GRAPH_LOCALES[language],
      alternateLocales: available
        .filter((other) => other !== language)
        .map((other) => OPEN_GRAPH_LOCALES[other]),
      alternates: alternatesOf(path, available),
      jsonLd: {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: language,
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
      },
    };
  }

  private landing(
    seo: LandingSeoFactory,
    path: string,
    language: Language,
    title: string,
  ): PageSeoConfig {
    const config = this.translatedPage(path, language, title, languages);

    return {
      ...config,
      ...seo(language, config.canonicalUrl, title),
    };
  }

  private page(
    routeSeo: Extract<RouteSeo, { kind: 'page' }>,
    path: string,
    language: Language,
    title: string,
  ): PageSeoConfig {
    const description = this.translate(
      `seo.description.${routeSeo.key}`,
      language,
    );
    const config = this.translatedPage(
      path,
      language,
      title,
      languages,
      description,
    );
    const webPage = { ...config.jsonLd, '@type': PAGE_TYPES[routeSeo.key] };

    return {
      ...config,
      noIndex: routeSeo.noIndex,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          routeSeo.key === 'home'
            ? { ...webPage, mainEntity: { '@id': PERSON_ID } }
            : webPage,
          this.website(language),
          this.person(language),
        ],
      },
    };
  }

  private post(
    page: ActivatedRouteSnapshot,
    path: string,
    language: Language,
    title: string,
  ): PageSeoConfig {
    const post = findPostBySlug(page.paramMap.get('slug') ?? '');
    const available = post?.languages ?? [DEFAULT_LANGUAGE];
    // A missing translation shows the English text. Search engines then
    // get the English page as the canonical one.
    const contentLanguage = available.includes(language)
      ? language
      : DEFAULT_LANGUAGE;
    const description = this.translate(
      `blog.posts.${post?.slug ?? ''}.summary`,
      contentLanguage,
    );
    const config = this.translatedPage(
      path,
      contentLanguage,
      title,
      available,
      description,
    );

    return {
      ...config,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `${config.canonicalUrl}#article`,
            url: config.canonicalUrl,
            mainEntityOfPage: config.canonicalUrl,
            headline: this.translate(
              `blog.posts.${post?.slug ?? ''}.title`,
              contentLanguage,
            ),
            description,
            inLanguage: contentLanguage,
            datePublished: post?.date.toISOString().slice(0, 10),
            dateModified: (post?.updated ?? post?.date)
              ?.toISOString()
              .slice(0, 10),
            image: SITE_IMAGE.url,
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isPartOf: { '@id': WEBSITE_ID },
          },
          this.website(language),
          this.person(language),
        ],
      },
    };
  }

  private website(language: Language): object {
    return {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'Ehsan Barooni',
      inLanguage: languages,
      publisher: { '@id': PERSON_ID },
      description: this.translate('seo.description.home', language),
    };
  }

  private person(language: Language): object {
    return {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Ehsan Barooni',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/profile.webp`,
      jobTitle: this.translate('seo.jobTitle', language),
      sameAs: SOCIAL_LINKS.map((link) => link.href),
    };
  }
}
