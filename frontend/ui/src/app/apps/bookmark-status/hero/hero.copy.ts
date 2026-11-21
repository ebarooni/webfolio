import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  iconAlt: 'Bookmark Status app icon',
  eyebrow: 'Safari extension for Mac',
  titleLine1: 'Already bookmarked?',
  titleLine2: 'Now you’ll know.',
  tagline:
    'Bookmark Status adds one quiet button to Safari’s toolbar. It turns blue when the page you’re on is already saved. Click it to see exactly where.',
  badgeLabel: 'Download Bookmark Status on the Mac App Store',
  secondaryLabel: 'See how it works',
  shotAlt:
    'The Bookmark Status tree page in Safari. Favorites › Recipes is open and Classic Banana Bread Recipe is highlighted with a This page tag.',
  toolbarAlt:
    'Safari toolbar with the blue Bookmark Status button and the tooltip Saved in Favorites › Recipes, Click to show in your bookmarks.',
  pillTitle: 'Read-only',
  pillBody: 'Never changes your bookmarks',
  trustLabel: 'Highlights',
  trust: [
    {
      title: 'Read-only by design.',
      body: 'Never writes to your bookmarks',
    },
    {
      title: 'No network access.',
      body: 'Nothing is sent anywhere',
    },
    {
      title: 'No account, no tracking.',
      body: 'No sign-up and no analytics',
    },
  ],
} as const;

type HeroCopy = CopyShape<typeof en>;

export const heroCopy: LocalizedCopy<HeroCopy> = {
  en,
  de: {
    iconAlt: 'App-Symbol von Bookmark Status',
    eyebrow: 'Safari-Erweiterung für den Mac',
    titleLine1: 'Schon als Lesezeichen gespeichert?',
    titleLine2: 'Jetzt weißt du es.',
    tagline:
      'Bookmark Status fügt der Symbolleiste von Safari eine unauffällige Taste hinzu. Sie wird blau, wenn die Seite, auf der du bist, schon gespeichert ist. Ein Klick zeigt dir genau, wo.',
    badgeLabel: 'Bookmark Status im Mac App Store laden',
    secondaryLabel: 'So funktioniert es',
    shotAlt:
      'Die Baumansicht von Bookmark Status in Safari. Favorites › Recipes ist geöffnet und Classic Banana Bread Recipe ist mit dem Etikett This page hervorgehoben.',
    toolbarAlt:
      'Safari-Symbolleiste mit der blauen Taste von Bookmark Status und dem Hinweis Saved in Favorites › Recipes, Click to show in your bookmarks.',
    pillTitle: 'Nur lesend',
    pillBody: 'Ändert nie deine Lesezeichen',
    trustLabel: 'Das Wichtigste',
    trust: [
      {
        title: 'Bewusst nur lesend.',
        body: 'Schreibt nie in deine Lesezeichen',
      },
      {
        title: 'Kein Netzwerkzugriff.',
        body: 'Nichts wird irgendwohin gesendet',
      },
      {
        title: 'Kein Konto, kein Tracking.',
        body: 'Keine Anmeldung und keine Analyse',
      },
    ],
  },
  nl: {
    iconAlt: 'App-icoon van Bookmark Status',
    eyebrow: 'Safari-extensie voor de Mac',
    titleLine1: 'Al een bladwijzer?',
    titleLine2: 'Nu weet je het.',
    tagline:
      'Bookmark Status voegt één rustige knop toe aan de knoppenbalk van Safari. Die wordt blauw als de pagina waarop je bent al bewaard is. Klik erop en je ziet precies waar.',
    badgeLabel: 'Download Bookmark Status in de Mac App Store',
    secondaryLabel: 'Bekijk hoe het werkt',
    shotAlt:
      'De boomweergave van Bookmark Status in Safari. Favorites › Recipes is open en Classic Banana Bread Recipe is gemarkeerd met het label This page.',
    toolbarAlt:
      'Knoppenbalk van Safari met de blauwe knop van Bookmark Status en de tip Saved in Favorites › Recipes, Click to show in your bookmarks.',
    pillTitle: 'Alleen-lezen',
    pillBody: 'Verandert nooit je bladwijzers',
    trustLabel: 'Hoogtepunten',
    trust: [
      {
        title: 'Bewust alleen-lezen.',
        body: 'Schrijft nooit naar je bladwijzers',
      },
      {
        title: 'Geen netwerktoegang.',
        body: 'Er wordt niets verstuurd',
      },
      {
        title: 'Geen account, geen tracking.',
        body: 'Geen aanmelding en geen analytics',
      },
    ],
  },
};
