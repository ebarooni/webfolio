export const privacyCopy = {
  title: 'Your bookmarks never leave your Mac.',
  lead: 'Bookmark Status works entirely on this Mac. No account, no cloud, nothing sent to anyone.',
  points: [
    {
      title: 'Read-only, always',
      body: 'It reads Safari’s bookmarks file and never writes to it. macOS only gives it read access.',
    },
    {
      title: 'No network, no analytics',
      body: 'No servers, trackers or analytics. Nothing in the app or the extension sends your data anywhere.',
    },
    {
      title: 'Only the page address',
      body: 'The extension compares the current tab’s address with your bookmarks. It never reads page content.',
    },
    {
      title: 'Stored on this Mac',
      body: 'For speed, the extension keeps a list of your bookmark URLs in its local storage. It isn’t encrypted, and it never leaves this Mac.',
    },
  ],
} as const;
