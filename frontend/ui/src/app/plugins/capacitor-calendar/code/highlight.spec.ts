import { describe, expect, it } from 'vitest';

import { type CodeLanguage, highlight, type TokenKind } from './highlight';

function kindsOf(code: string, language: CodeLanguage): [TokenKind, string][] {
  return highlight(code, language)
    .filter((token) => token.kind !== 'plain')
    .map((token) => [token.kind, token.text]);
}

describe('highlight', () => {
  it.each<[string, CodeLanguage]>([
    [
      "import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';",
      'typescript',
    ],
    ['npm install @ebarooni/capacitor-calendar\nnpx cap sync', 'shell'],
    ['<key>NSCalendarsUsageDescription</key>\n<string>Hi</string>', 'xml'],
    ['const startDate = Date.now() + 60 * 1000; // soon', 'typescript'],
  ])('keeps the original text of %j', (code, language) => {
    const joined = highlight(code, language)
      .map((token) => token.text)
      .join('');

    expect(joined).toBe(code);
  });

  it('colors keywords, types, functions, strings, numbers and comments', () => {
    expect(
      kindsOf(
        "const { id } = await CapacitorCalendar.createEvent({ title: 'Review', at: 60 }); // done",
        'typescript',
      ),
    ).toEqual([
      ['keyword', 'const'],
      ['keyword', 'await'],
      ['type', 'CapacitorCalendar'],
      ['function', 'createEvent'],
      ['string', "'Review'"],
      ['number', '60'],
      ['comment', '// done'],
    ]);
  });

  it('does not color a keyword or a type inside a longer name', () => {
    expect(kindsOf('startDate + importantValue', 'typescript')).toEqual([]);
  });

  it('colors the command at the start of each shell line and the package', () => {
    expect(
      kindsOf(
        'npm install @ebarooni/capacitor-calendar\nnpx cap sync',
        'shell',
      ),
    ).toEqual([
      ['command', 'npm'],
      ['string', '@ebarooni/capacitor-calendar'],
      ['command', 'npx'],
    ]);
  });

  it('colors XML tags, attributes and values', () => {
    expect(
      kindsOf(
        '<uses-permission android:name="android.permission.READ_CALENDAR" />',
        'xml',
      ),
    ).toEqual([
      ['tag', '<uses-permission'],
      ['attribute', 'android:name'],
      ['string', '"android.permission.READ_CALENDAR"'],
      ['tag', '/>'],
    ]);
  });
});
