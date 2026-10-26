export const companionCardCopy = {
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

export function copyPartCode(
  part: string | { readonly code: string },
): string | null {
  if (typeof part === 'string') {
    return null;
  }

  return part.code;
}
