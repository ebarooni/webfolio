import {
  CopyShape,
  LocalizedCopy,
} from '../../../../localization/localized-copy';

const en = {
  kicker: 'At a glance',
  title: 'Saved? The toolbar already knows.',
  body: 'The button turns blue when the page you’re on is in your bookmarks. Hover to see which folder it’s in. Not saved yet? It tells you how many pages from the same site you already have.',
  legendLabel: 'Toolbar button states',
  legend: ['Not saved', 'Saved', 'Needs access'],
  savedAlt:
    'Tooltip: Saved in Favorites › Recipes. Click to show in your bookmarks.',
  siteAlt:
    'Tooltip: Not saved · 3 pages from nytimes.com are saved. Click to see them.',
} as const;

type ToolbarCardCopy = CopyShape<typeof en>;

export const toolbarCardCopy: LocalizedCopy<ToolbarCardCopy> = {
  en,
  de: {
    kicker: 'Auf einen Blick',
    title: 'Gespeichert? Die Symbolleiste weiß es schon.',
    body: 'Die Taste wird blau, wenn die Seite, auf der du bist, in deinen Lesezeichen ist. Zeig mit der Maus darauf und du siehst, in welchem Ordner. Noch nicht gespeichert? Dann sagt sie dir, wie viele Seiten derselben Website du schon hast.',
    legendLabel: 'Zustände der Taste in der Symbolleiste',
    legend: ['Nicht gespeichert', 'Gespeichert', 'Braucht Zugriff'],
    savedAlt:
      'Hinweis: Saved in Favorites › Recipes. Click to show in your bookmarks.',
    siteAlt:
      'Hinweis: Not saved · 3 pages from nytimes.com are saved. Click to see them.',
  },
  nl: {
    kicker: 'In één oogopslag',
    title: 'Bewaard? De knoppenbalk weet het al.',
    body: 'De knop wordt blauw als de pagina waarop je bent in je bladwijzers staat. Beweeg de muis erover en je ziet in welke map. Nog niet bewaard? Dan zegt hij hoeveel pagina’s van dezelfde site je al hebt.',
    legendLabel: 'Standen van de knop in de knoppenbalk',
    legend: ['Niet bewaard', 'Bewaard', 'Heeft toegang nodig'],
    savedAlt:
      'Tip: Saved in Favorites › Recipes. Click to show in your bookmarks.',
    siteAlt:
      'Tip: Not saved · 3 pages from nytimes.com are saved. Click to see them.',
  },
};
