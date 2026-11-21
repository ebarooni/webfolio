import { describe, expect, it } from 'vitest';

import { localizePath, splitLanguagePrefix } from './localized-path';

describe('localizePath', () => {
  it.each([
    { path: '/', language: 'en', expected: '/' },
    { path: '/projects', language: 'en', expected: '/projects' },
    { path: '/', language: 'de', expected: '/de' },
    { path: '/blog/post', language: 'de', expected: '/de/blog/post' },
    { path: 'contact', language: 'nl', expected: '/nl/contact' },
  ] as const)(
    'gives $expected for $path in $language',
    ({ path, language, expected }) => {
      expect(localizePath(path, language)).toBe(expected);
    },
  );
});

describe('splitLanguagePrefix', () => {
  it.each([
    { url: '/', language: 'en', path: '/' },
    { url: '/projects?tab=1#top', language: 'en', path: '/projects' },
    { url: '/de', language: 'de', path: '/' },
    { url: '/nl/blog/post', language: 'nl', path: '/blog/post' },
    // "/en" is not a prefix. English pages have none.
    { url: '/en/projects', language: 'en', path: '/en/projects' },
    { url: '/design', language: 'en', path: '/design' },
  ] as const)('reads $url', ({ url, language, path }) => {
    expect(splitLanguagePrefix(url)).toEqual({ language, path });
  });
});
