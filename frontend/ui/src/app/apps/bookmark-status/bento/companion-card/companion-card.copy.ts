import {
  CopyShape,
  LocalizedCopy,
} from '../../../../localization/localized-copy';

const en = {
  kicker: 'Mac app',
  title: 'A companion app that stays out of the way.',
  body: 'Browse and search all your bookmarks in a native sidebar. Close the window and Bookmark Status keeps working in the background, one click away in the menu bar.',
  checks: [
    ['Folder outline with bookmark counts'],
    [
      'Sidebar search with the same ',
      { code: 'site:' },
      ' and ',
      { code: 'host:' },
      ' filters',
    ],
    ['Menu bar status, plus Open Bookmark Tree'],
  ],
  alt: 'The Bookmark Status app sidebar with Safari Bookmarks folders, counts and a context menu item Open 12 in New Tabs.',
  menuLabel:
    'Menu bar menu: Ready · 68 bookmarks, Open Bookmark Status, Open Bookmark Tree, Quit Bookmark Status',
  clock: 'Tue 9:41',
  status: 'Ready · 68 bookmarks',
  openApp: 'Open Bookmark Status',
  openTree: 'Open Bookmark Tree',
  quit: 'Quit Bookmark Status',
  quitShortcut: '⌘Q',
} as const;

type CompanionCardCopy = CopyShape<typeof en>;

export const companionCardCopy: LocalizedCopy<CompanionCardCopy> = {
  en,
  de: {
    kicker: 'Mac-App',
    title: 'Eine Begleit-App, die nicht im Weg steht.',
    body: 'Durchsuche und durchstöbere alle deine Lesezeichen in einer nativen Seitenleiste. Schließt du das Fenster, arbeitet Bookmark Status im Hintergrund weiter, nur einen Klick entfernt in der Menüleiste.',
    checks: [
      ['Ordnerübersicht mit der Zahl der Lesezeichen'],
      [
        'Suche in der Seitenleiste mit denselben Filtern ',
        { code: 'site:' },
        ' und ',
        { code: 'host:' },
      ],
      ['Status in der Menüleiste und Open Bookmark Tree'],
    ],
    alt: 'Die Seitenleiste der App Bookmark Status mit den Ordnern der Safari-Lesezeichen, ihren Zahlen und dem Kontextmenüeintrag Open 12 in New Tabs.',
    menuLabel:
      'Menü in der Menüleiste: Ready · 68 bookmarks, Open Bookmark Status, Open Bookmark Tree, Quit Bookmark Status',
    clock: 'Tue 9:41',
    status: 'Ready · 68 bookmarks',
    openApp: 'Open Bookmark Status',
    openTree: 'Open Bookmark Tree',
    quit: 'Quit Bookmark Status',
    quitShortcut: '⌘Q',
  },
  nl: {
    kicker: 'Mac-app',
    title: 'Een begeleidende app die niet in de weg zit.',
    body: 'Blader door al je bladwijzers en doorzoek ze in een native zijbalk. Sluit je het venster, dan blijft Bookmark Status op de achtergrond werken, één klik verderop in de menubalk.',
    checks: [
      ['Mappenoverzicht met het aantal bladwijzers'],
      [
        'Zoeken in de zijbalk met dezelfde filters ',
        { code: 'site:' },
        ' en ',
        { code: 'host:' },
      ],
      ['Status in de menubalk, plus Open Bookmark Tree'],
    ],
    alt: 'De zijbalk van de app Bookmark Status met de mappen van de Safari-bladwijzers, hun aantallen en het contextmenu-item Open 12 in New Tabs.',
    menuLabel:
      'Menu in de menubalk: Ready · 68 bookmarks, Open Bookmark Status, Open Bookmark Tree, Quit Bookmark Status',
    clock: 'Tue 9:41',
    status: 'Ready · 68 bookmarks',
    openApp: 'Open Bookmark Status',
    openTree: 'Open Bookmark Tree',
    quit: 'Quit Bookmark Status',
    quitShortcut: '⌘Q',
  },
};

export function copyPartCode(
  part: string | { readonly code: string },
): string | null {
  if (typeof part === 'string') {
    return null;
  }

  return part.code;
}
