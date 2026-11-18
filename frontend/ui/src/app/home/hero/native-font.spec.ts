import { describe, expect, it } from 'vitest';

import { nativeFontFamily } from './native-font';

describe('nativeFontFamily', () => {
  it.each([
    {
      platform: 'Mac',
      userAgent: 'Mozilla/5.0 (Macintosh)',
      font: 'ui-rounded',
    },
    {
      platform: 'iPhone',
      userAgent: 'Mozilla/5.0 (iPhone)',
      font: 'ui-rounded',
    },
    {
      platform: 'Android',
      userAgent: 'Mozilla/5.0 (Linux; Android 16)',
      font: 'Roboto',
    },
    {
      platform: 'Windows',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0)',
      font: 'Segoe UI',
    },
    {
      platform: 'Linux',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      font: 'Ubuntu',
    },
  ])('should pick a typical font for $platform', ({ userAgent, font }) => {
    expect(nativeFontFamily(userAgent)).toContain(font);
  });
});
