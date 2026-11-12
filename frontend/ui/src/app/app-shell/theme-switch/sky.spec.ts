import { describe, expect, it } from 'vitest';

import { celestialOffset, seasonOf } from './sky';

describe('sky', () => {
  it.each([
    { month: 0, season: 'winter' },
    { month: 2, season: 'spring' },
    { month: 4, season: 'spring' },
    { month: 5, season: 'summer' },
    { month: 8, season: 'autumn' },
    { month: 10, season: 'autumn' },
    { month: 11, season: 'winter' },
  ])('should map month $month to $season', ({ month, season }) => {
    expect(seasonOf(new Date(2026, month, 15))).toBe(season);
  });

  it.each([
    { theme: 'light', hour: 12, offset: -3 },
    { theme: 'light', hour: 6, offset: 5 },
    { theme: 'light', hour: 23, offset: 5 },
    { theme: 'dark', hour: 0, offset: -3 },
    { theme: 'dark', hour: 18, offset: 5 },
    { theme: 'dark', hour: 12, offset: 5 },
  ] as const)(
    'should put the $theme body at $offset at $hour o’clock',
    ({ theme, hour, offset }) => {
      expect(celestialOffset(theme, new Date(2026, 5, 15, hour))).toBe(offset);
    },
  );
});
