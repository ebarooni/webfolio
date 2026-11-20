import { describe, expect, it } from 'vitest';

import {
  celestialOffset,
  moonLitPath,
  moonLook,
  moonRotation,
  neutralMoonLook,
  neutralOffset,
  neutralSunLook,
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
    { month: 0, latitude: undefined, season: 'winter' },
    { month: 6, latitude: undefined, season: 'summer' },
    { month: 0, latitude: Number.NaN, season: 'winter' },
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

  it.each([
    { body: 'sun', hour: 12, offset: -3 },
    { body: 'sun', hour: 6, offset: 5 },
    { body: 'sun', hour: 23, offset: 5 },
    { body: 'moon', hour: 0, offset: -3 },
    { body: 'moon', hour: 18, offset: 5 },
    { body: 'moon', hour: 12, offset: 5 },
  ] as const)(
    'should put the neutral $body at $offset at $hour o’clock',
    ({ body, hour, offset }) => {
      expect(neutralOffset(body, new Date(2026, 5, 15, hour))).toBe(offset);
    },
  );

  it('should give the neutral sun and moon the look from before', () => {
    const noon = new Date(2026, 5, 15, 12);

    expect(neutralSunLook(noon)).toEqual({
      offset: -3,
      core: '#ffc533',
      glow: '#ffd86b',
      glowOpacity: 0.35,
    });
    expect(neutralMoonLook(noon)).toEqual({
      offset: 5,
      litPath: moonLitPath(1),
      rotation: 0,
      glowOpacity: 0,
      hasShadow: false,
    });
  });

  it.each([
    { name: 'no location', location: undefined },
    {
      name: 'a latitude that is not a number',
      location: { latitude: Number.NaN, longitude: 13 },
    },
    {
      name: 'a longitude that is not a number',
      location: { latitude: 52, longitude: Number.NaN },
    },
  ])(
    'should fall back to the neutral sun and moon with $name',
    ({ location }) => {
      const date = new Date('2026-11-20T21:00:00Z');

      expect(sunLook(date, location)).toEqual(neutralSunLook(date));
      expect(moonLook(date, location)).toEqual(neutralMoonLook(date));
    },
  );

  it('should fall back for an invalid date without a NaN in the look', () => {
    const invalidDate = new Date(Number.NaN);

    expect(sunLook(invalidDate, BERLIN)).toEqual(neutralSunLook(invalidDate));
    expect(moonLook(invalidDate, BERLIN)).toEqual(neutralMoonLook(invalidDate));
    expect(neutralSunLook(invalidDate).offset).toBe(5);
  });

  it('should draw a full moon without a shadow', () => {
    const fullMoon = moonLook(new Date('2026-11-24T22:30:00Z'), BERLIN);

    expect(fullMoon.hasShadow).toBe(false);
    expect(fullMoon.litPath).toBe(moonLitPath(1));
  });
});
