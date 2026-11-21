import {
  CopyShape,
  LocalizedCopy,
} from '../../../../localization/localized-copy';

const en = {
  kicker: 'Search',
  title: 'Search that speaks URL.',
  body: 'Find any bookmark by title or address, with its folder path on every result. Scope to Favorites or Bookmarks Menu, or narrow it down with:',
  tokens: ['site:nytimes.com', 'host:cooking.nytimes.com'],
  alt: 'Bookmark search for site:nytimes.com with All, Favorites and Bookmarks Menu scope chips and three results with folder paths.',
} as const;

type SearchCardCopy = CopyShape<typeof en>;

export const searchCardCopy: LocalizedCopy<SearchCardCopy> = {
  en,
  de: {
    kicker: 'Suche',
    title: 'Eine Suche, die URLs versteht.',
    body: 'Finde jedes Lesezeichen über Titel oder Adresse, mit dem Ordnerpfad bei jedem Treffer. Beschränke die Suche auf Favorites oder Bookmarks Menu, oder grenze sie ein mit:',
    tokens: ['site:nytimes.com', 'host:cooking.nytimes.com'],
    alt: 'Lesezeichensuche nach site:nytimes.com mit den Bereichen All, Favorites und Bookmarks Menu und drei Treffern mit Ordnerpfaden.',
  },
  nl: {
    kicker: 'Zoeken',
    title: 'Zoeken dat URL’s begrijpt.',
    body: 'Vind elke bladwijzer op titel of adres, met het mappad bij elk resultaat. Beperk je zoekopdracht tot Favorites of Bookmarks Menu, of verfijn hem met:',
    tokens: ['site:nytimes.com', 'host:cooking.nytimes.com'],
    alt: 'Zoeken in bladwijzers naar site:nytimes.com met de bereiken All, Favorites en Bookmarks Menu en drie resultaten met mappaden.',
  },
};
