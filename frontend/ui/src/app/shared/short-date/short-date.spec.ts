import { describe, expect, it } from 'vitest';

import { ShortDate } from './short-date';

describe('ShortDate', () => {
  it.each([
    { language: 'en', expected: 'Apr 4, 2026' },
    { language: 'de', expected: '4. Apr. 2026' },
  ])('should format the date for $language', ({ language, expected }) => {
    expect(new ShortDate().transform(new Date(2026, 3, 4), language)).toBe(
      expected,
    );
  });
});
