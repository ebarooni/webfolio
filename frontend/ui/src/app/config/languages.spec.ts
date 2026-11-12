import { describe, expect, it } from 'vitest';

import { detectLanguage, isLanguage } from './languages';

describe('languages', () => {
  it.each([
    { value: 'en', expected: true },
    { value: 'de', expected: true },
    { value: 'fr', expected: false },
    { value: 42, expected: false },
    { value: undefined, expected: false },
  ])(
    'should report $expected for the language $value',
    ({ value, expected }) => {
      expect(isLanguage(value)).toBe(expected);
    },
  );

  it.each([
    { locales: ['de-AT', 'en-US'], expected: 'de' },
    { locales: ['fr-FR', 'en-GB'], expected: 'en' },
    { locales: ['DE'], expected: 'de' },
    { locales: ['fr-FR'], expected: 'en' },
    { locales: [], expected: 'en' },
  ])('should detect $expected from $locales', ({ locales, expected }) => {
    expect(detectLanguage(locales)).toBe(expected);
  });
});
