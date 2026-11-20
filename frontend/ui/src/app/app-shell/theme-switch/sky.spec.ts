import { describe, expect, it } from 'vitest';

import {
  celestialOffset,
  moonLitPath,
  moonLook,
  moonRotation,
  seasonOf,
  sunLook,
} from './sky';

const BERLIN = { latitude: 52, longitude: 13 };

describe('sky', () => {
  it.each([
    { month: 0, latitude: 52, season: 'winter' },
    { month: 2, latitude: 52, season: 'spring' },
    { month: 4, latitude: 52, season: 'spring' },
    { month: 5, latitude: 52, season: 'summer' },
    { month: 8, latitude: 52, season: 'autumn' },
    { month: 11, latitude: 52, season: 'winter' },
    { month: 0, latitude: -34, season: 'summer' },
    { month: 6, latitude: -34, season: 'winter' },
    { month: 9, latitude: -34, season: 'spring' },
    { month: 0, latitude: 1, season: 'summer' },
    { month: 6, latitude: 1, season: 'summer' },
  ])(
    'should map month $month at latitude $latitude to $season',
    ({ month, latitude, season }) => {
      expect(seasonOf(new Date(2026, month, 15), latitude)).toBe(season);
    },
  );

  it.each([
    { altitude: 90, offset: -3 },
    { altitude: 30, offset: 1 },
    { altitude: 0, offset: 5 },
    { altitude: -6, offset: 6.5 },
    { altitude: -40, offset: 8 },
  ])('should put a body at $altitude° at $offset', ({ altitude, offset }) => {
    expect(celestialOffset(altitude)).toBe(offset);
  });

  it.each([
    { fraction: 0, path: 'M22 9A11 11 0 0 1 22 31A11 11 0 0 0 22 9Z' },
    { fraction: 0.5, path: 'M22 9A11 11 0 0 1 22 31A0 11 0 0 0 22 9Z' },
    { fraction: 0.75, path: 'M22 9A11 11 0 0 1 22 31A5.5 11 0 0 1 22 9Z' },
    { fraction: 1, path: 'M22 9A11 11 0 0 1 22 31A11 11 0 0 1 22 9Z' },
  ])(
    'should draw the lit part for fraction $fraction',
    ({ fraction, path }) => {
      expect(moonLitPath(fraction)).toBe(path);
    },
  );

  it.each([
    { degrees: -90, rotation: 0 },
    { degrees: 0, rotation: -90 },
    { degrees: 135, rotation: 135 },
    { degrees: 180, rotation: 90 },
  ])(
    'should turn a lit limb at $degrees° from the zenith by $rotation°',
    ({ degrees, rotation }) => {
      expect(moonRotation((degrees * Math.PI) / 180)).toBe(rotation);
    },
  );

  it('should make a low sun orange and a high sun golden', () => {
    const sunset = sunLook(new Date('2026-11-20T15:10:00Z'), BERLIN);
    const midsummerNoon = sunLook(new Date('2026-06-21T11:10:00Z'), BERLIN);

    expect(sunset.core).toBe('#ff8a3d');
    expect(midsummerNoon.core).toBe('#ffc533');
    expect(midsummerNoon.offset).toBeLessThan(sunset.offset);
  });

  it('should light the right side of a waxing crescent in Berlin', () => {
    const crescent = moonLook(new Date('2026-12-13T16:30:00Z'), BERLIN);

    expect(crescent.litPath).toContain(' 0 0 0 22 9Z');
    expect(Math.abs(crescent.rotation)).toBeLessThan(90);
  });
});
