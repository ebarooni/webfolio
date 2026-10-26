export const treeCardCopy = {
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
