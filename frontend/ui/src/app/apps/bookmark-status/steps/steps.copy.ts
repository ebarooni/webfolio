export const stepsCopy = {
  eyebrow: 'How it works',
  titleLead: 'Set it up once.',
  titleTail: 'Then just browse.',
  steps: [
    {
      title: 'Choose Safari’s bookmarks file',
      body: 'macOS asks you to pick it once. The app and the extension share that access from then on.',
    },
    {
      title: 'Turn on the extension',
      body: 'Turn on Bookmark Status and allow it on all websites, so the toolbar button can see which page you’re on.',
    },
    {
      title: 'Browse as usual',
      body: 'The button updates as you switch tabs. Close the app window anytime. It keeps working in the background.',
    },
  ],
  fileHintBefore: 'In the file panel, press ',
  fileKeysLabel: 'Shift Command G',
  fileKeys: ['⇧', '⌘', 'G'],
  fileHintAfter: ' and paste ',
  filePath: '~/Library/Safari/Bookmarks.plist',
  crumb: 'Safari Settings › Extensions › Bookmark Status › All Websites: ',
  crumbStrong: 'Allow',
  notSaved: 'Not saved',
  saved: 'Saved',
} as const;
