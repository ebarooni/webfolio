export const faqCopy = {
  eyebrow: 'FAQ',
  title: 'Questions, answered.',
  addBefore:
    'So Bookmark Status only reads Safari’s bookmarks file and never writes to it. To add or tidy bookmarks, use Safari’s own Add Bookmark (',
  addBetween: ') and bookmarks editor (',
  addAfter: ').',
  addKeysLabel: 'Command D',
  addKeys: ['⌘', 'D'],
  editorKeysLabel: 'Option Command B',
  editorKeys: ['⌥', '⌘', 'B'],
  matchBefore:
    'Matching is exact: a different path or query counts as a different page. The part after ',
  matchAfter:
    ' and one trailing slash are ignored. Only web (http and https) bookmarks count; Reading List and History don’t. When the exact page isn’t saved, the tooltip tells you how many pages from that site are, and one click shows them.',
  items: [
    {
      question: 'Can Bookmark Status add or remove bookmarks?',
      open: true,
      kind: 'add',
      paragraphs: [
        'No, and that’s on purpose. Apple’s Mac App Store rules (App Review Guideline 2.4.5) only let apps change another app’s data, like bookmarks, through macOS APIs made for it. Safari doesn’t offer one for bookmarks.',
      ],
    },
    {
      question: 'What do I need to use it?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'A Mac with macOS Ventura 13 or later and Safari 16.4 or later. During setup you pick Safari’s bookmarks file once and turn on the extension with All Websites set to Allow.',
      ],
    },
    {
      question: 'Why does it need access to all websites?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'So the toolbar button can see the address of the page you’re on and check it against your bookmarks. It doesn’t add scripts to websites or read what’s on the page.',
      ],
    },
    {
      question:
        'Why does a page show “Not saved” when I bookmarked a similar link?',
      open: false,
      kind: 'match',
      paragraphs: [],
    },
    {
      question: 'Does it work with Safari profiles?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'Bookmark Status follows one bookmarks file at a time and uses it in every Safari profile. To follow another profile’s bookmarks, choose that profile’s bookmarks file instead with Choose a Different File… in the app.',
      ],
    },
    {
      question: 'What happens when I close the window?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'The app leaves the Dock but keeps running, so the toolbar button keeps working. Use the bookmark icon in the menu bar to reopen the window, open the bookmark tree, or quit.',
      ],
    },
    {
      question: 'How much does it cost?',
      open: false,
      kind: 'plain',
      paragraphs: [
        'PRICE_TBD. Pricing will be confirmed on the Mac App Store at launch.',
      ],
    },
  ],
} as const;
