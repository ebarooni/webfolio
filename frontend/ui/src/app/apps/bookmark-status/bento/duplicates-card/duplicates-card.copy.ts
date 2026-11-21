import {
  CopyShape,
  LocalizedCopy,
} from '../../../../localization/localized-copy';

const en = {
  kicker: 'Insights',
  title: 'Spot pages you saved twice.',
  lead: 'Insights › Duplicates',
  body: ' lists every page saved in more than one place, with each folder it’s in. Tidy up in Safari’s bookmarks editor.',
  alt: 'The Bookmark Status app showing Insights › Duplicates: pages saved more than once, each with the folders it’s saved in.',
} as const;

type DuplicatesCardCopy = CopyShape<typeof en>;

export const duplicatesCardCopy: LocalizedCopy<DuplicatesCardCopy> = {
  en,
  de: {
    kicker: 'Einblicke',
    title: 'Finde Seiten, die du doppelt gespeichert hast.',
    lead: 'Insights › Duplicates',
    body: ' zeigt jede Seite, die an mehr als einem Ort gespeichert ist, mit jedem Ordner, in dem sie liegt. Aufräumen kannst du im Lesezeichen-Editor von Safari.',
    alt: 'Die App Bookmark Status mit Insights › Duplicates: Seiten, die mehr als einmal gespeichert sind, jeweils mit ihren Ordnern.',
  },
  nl: {
    kicker: 'Inzichten',
    title: 'Vind pagina’s die je twee keer hebt bewaard.',
    lead: 'Insights › Duplicates',
    body: ' toont elke pagina die op meer dan één plek is bewaard, met elke map waarin ze staat. Opruimen doe je in de bladwijzer-editor van Safari.',
    alt: 'De app Bookmark Status met Insights › Duplicates: pagina’s die meer dan eens zijn bewaard, elk met de mappen waarin ze staan.',
  },
};
