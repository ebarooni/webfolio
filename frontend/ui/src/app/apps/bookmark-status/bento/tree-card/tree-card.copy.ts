import {
  CopyShape,
  LocalizedCopy,
} from '../../../../localization/localized-copy';

const en = {
  kicker: 'Bookmark tree',
  title: 'Every bookmark, one click away.',
  beforeKeys: 'Click the button or press ',
  keysLabel: 'Option Shift B',
  keys: ['⌥', '⇧', 'B'],
  afterKeys:
    ' to open a clean, read-only view of all your bookmarks. The page you’re on is marked, and edits you make in Safari show up automatically.',
  path: 'Favorites › Recipes',
  live: 'Updates automatically',
  currentTag: 'This page',
  rows: [
    {
      letter: 'C',
      name: 'Classic Banana Bread',
      domain: 'seriouseats.com',
      tile: 'blue',
      current: true,
    },
    {
      letter: 'T',
      name: 'Chocolate Chip Cookies',
      domain: 'seriouseats.com',
      tile: 'blue',
      current: false,
    },
    {
      letter: 'S',
      name: 'Sourdough Starter',
      domain: 'kingarthurbaking.com',
      tile: 'green',
      current: false,
    },
  ],
} as const;

type TreeCardCopy = CopyShape<typeof en>;

export const treeCardCopy: LocalizedCopy<TreeCardCopy> = {
  en,
  de: {
    kicker: 'Lesezeichenbaum',
    title: 'Jedes Lesezeichen, einen Klick entfernt.',
    beforeKeys: 'Klicke auf die Taste oder drücke ',
    keysLabel: 'Wahltaste Umschalttaste B',
    keys: ['⌥', '⇧', 'B'],
    afterKeys:
      ', um eine aufgeräumte, nur lesende Ansicht aller deiner Lesezeichen zu öffnen. Die Seite, auf der du bist, ist markiert, und Änderungen in Safari erscheinen automatisch.',
    path: 'Favorites › Recipes',
    live: 'Updates automatically',
    currentTag: 'This page',
    rows: en.rows,
  },
  nl: {
    kicker: 'Bladwijzerboom',
    title: 'Elke bladwijzer, één klik verderop.',
    beforeKeys: 'Klik op de knop of druk op ',
    keysLabel: 'Option Shift B',
    keys: ['⌥', '⇧', 'B'],
    afterKeys:
      ' om een overzichtelijke, alleen-lezen weergave van al je bladwijzers te openen. De pagina waarop je bent is gemarkeerd, en wat je in Safari wijzigt, verschijnt vanzelf.',
    path: 'Favorites › Recipes',
    live: 'Updates automatically',
    currentTag: 'This page',
    rows: en.rows,
  },
};
