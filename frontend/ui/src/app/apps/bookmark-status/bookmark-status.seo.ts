import { Language } from '../../config/languages';
import { SITE_URL } from '../../config/site';
import { type LandingSeo } from '../../shared/seo/route-seo';
import {
  APP_STORE_URL,
  BOOKMARK_STATUS_ASSET_BASE,
} from './bookmark-status.copy';

const IMAGE_URL = `${SITE_URL}${BOOKMARK_STATUS_ASSET_BASE}/og-image.png`;

type Texts = Readonly<{
  description: string;
  socialTitle: string;
  socialDescription: string;
  imageAlt: string;
  app: string;
  operatingSystem: string;
  softwareRequirements: string;
}>;

/** The page title is "pageTitles.bookmarkStatus" in the translations. */
const TEXTS: Readonly<Record<Language, Texts>> = {
  en: {
    description:
      'See at a glance whether the page you’re on is already in your Safari bookmarks, and where. Read-only, private, and entirely on your Mac.',
    socialTitle: 'Bookmark Status: already bookmarked? Now you’ll know.',
    socialDescription:
      'A Safari toolbar button that shows whether the current page is in your bookmarks, and where. Read-only and on-device.',
    imageAlt:
      'Bookmark Status app icon next to a Safari bookmark tree with the current page highlighted',
    app: 'A Safari extension and Mac app that shows whether the current page is already in your Safari bookmarks, and where. Read-only and on-device.',
    operatingSystem: 'macOS 13.0 or later',
    softwareRequirements: 'Safari 16.4 or later',
  },
  de: {
    description:
      'Sieh auf einen Blick, ob die Seite, auf der du bist, schon in deinen Safari-Lesezeichen ist, und wo. Nur lesend, privat und vollständig auf deinem Mac.',
    socialTitle: 'Bookmark Status: Schon gespeichert? Jetzt weißt du es.',
    socialDescription:
      'Eine Taste in der Safari-Symbolleiste, die zeigt, ob die aktuelle Seite in deinen Lesezeichen ist, und wo. Nur lesend und auf dem Gerät.',
    imageAlt:
      'App-Symbol von Bookmark Status neben einem Safari-Lesezeichenbaum mit der aktuellen Seite hervorgehoben',
    app: 'Eine Safari-Erweiterung und Mac-App, die zeigt, ob die aktuelle Seite schon in deinen Safari-Lesezeichen ist, und wo. Nur lesend und auf dem Gerät.',
    operatingSystem: 'macOS 13.0 oder neuer',
    softwareRequirements: 'Safari 16.4 oder neuer',
  },
  nl: {
    description:
      'Zie in één oogopslag of de pagina waarop je bent al in je Safari-bladwijzers staat, en waar. Alleen-lezen, privé en volledig op je Mac.',
    socialTitle: 'Bookmark Status: al een bladwijzer? Nu weet je het.',
    socialDescription:
      'Een knop in de knoppenbalk van Safari die laat zien of de huidige pagina in je bladwijzers staat, en waar. Alleen-lezen en op het apparaat.',
    imageAlt:
      'App-icoon van Bookmark Status naast een Safari-bladwijzerboom met de huidige pagina gemarkeerd',
    app: 'Een Safari-extensie en Mac-app die laat zien of de huidige pagina al in je Safari-bladwijzers staat, en waar. Alleen-lezen en op het apparaat.',
    operatingSystem: 'macOS 13.0 of nieuwer',
    softwareRequirements: 'Safari 16.4 of nieuwer',
  },
};

/** The head tags of the page in one language, see RouteSeo. */
export function bookmarkStatusSeo(language: Language, url: string): LandingSeo {
  const texts = TEXTS[language];

  return {
    description: texts.description,
    social: {
      title: texts.socialTitle,
      description: texts.socialDescription,
    },
    image: { url: IMAGE_URL, alt: texts.imageAlt, width: 1200, height: 630 },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Bookmark Status',
      alternateName: 'Bookmark Status for Safari',
      description: texts.app,
      inLanguage: language,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: texts.operatingSystem,
      softwareRequirements: texts.softwareRequirements,
      url,
      downloadUrl: APP_STORE_URL,
      image: IMAGE_URL,
      screenshot: `${SITE_URL}${BOOKMARK_STATUS_ASSET_BASE}/hero-tree-light@2x.png`,
      author: {
        '@type': 'Person',
        name: 'Ehsan Barooni',
        url: `${SITE_URL}/`,
      },
    },
  };
}
