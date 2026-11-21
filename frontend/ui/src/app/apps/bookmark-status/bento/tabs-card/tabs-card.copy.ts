import {
  CopyShape,
  LocalizedCopy,
} from '../../../../localization/localized-copy';

const en = {
  kicker: 'Open in tabs',
  title: 'Open a whole folder at once.',
  body: 'Send every bookmark in a folder to new Safari tabs, from the tree or the app. More than 10? It checks with you first.',
  alt: 'Confirmation dialog: Open 24 bookmarks in new tabs? They’ll open as new tabs in Safari. Buttons: Cancel, Open 24 Tabs.',
} as const;

type TabsCardCopy = CopyShape<typeof en>;

export const tabsCardCopy: LocalizedCopy<TabsCardCopy> = {
  en,
  de: {
    kicker: 'In Tabs öffnen',
    title: 'Öffne einen ganzen Ordner auf einmal.',
    body: 'Öffne jedes Lesezeichen eines Ordners in neuen Safari-Tabs, aus der Baumansicht oder der App. Mehr als 10? Dann fragt es dich vorher.',
    alt: 'Bestätigungsdialog: Open 24 bookmarks in new tabs? They’ll open as new tabs in Safari. Tasten: Cancel, Open 24 Tabs.',
  },
  nl: {
    kicker: 'Openen in tabbladen',
    title: 'Open een hele map in één keer.',
    body: 'Open elke bladwijzer uit een map in nieuwe Safari-tabbladen, vanuit de boomweergave of de app. Meer dan 10? Dan vraagt hij het je eerst.',
    alt: 'Bevestigingsvenster: Open 24 bookmarks in new tabs? They’ll open as new tabs in Safari. Knoppen: Cancel, Open 24 Tabs.',
  },
};
