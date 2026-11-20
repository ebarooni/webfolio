import { describe, expect, it } from 'vitest';

import { moonIllumination, moonPosition, sunPosition } from './astronomy';

const BERLIN = { latitude: 52.5, longitude: 13.4 };
const SYDNEY = { latitude: -33.9, longitude: 151.2 };
const QUITO = { latitude: -0.2, longitude: -78.5 };

function degrees(radians: number): number {
  const turned = ((radians * 180) / Math.PI) % 360;

  return turned < 0 ? turned + 360 : turned;
}

describe('astronomy', () => {
  it.each([
    { time: '2026-11-20T11:15:00Z', altitude: 17.7 },
    { time: '2026-06-21T11:10:00Z', altitude: 60.9 },
    { time: '2026-11-20T23:00:00Z', altitude: -57.2 },
  ])(
    'should find the sun at $altitude° in Berlin at $time',
    ({ time, altitude }) => {
      expect(sunPosition(new Date(time), BERLIN).altitude).toBeCloseTo(
        altitude,
        0,
      );
    },
  );

  it.each([
    { name: 'new moon', time: '2026-01-18T19:52:00Z', fraction: 0 },
    { name: 'full moon', time: '2026-03-03T11:38:00Z', fraction: 1 },
    { name: 'full moon', time: '2026-11-24T14:53:00Z', fraction: 1 },
  ])('should find the $name at $time', ({ time, fraction }) => {
    expect(moonIllumination(new Date(time), BERLIN).fraction).toBeCloseTo(
      fraction,
      2,
    );
  });

  it('should find the moon above the horizon in Berlin at night', () => {
    const altitude = moonPosition(
      new Date('2026-11-20T21:00:00Z'),
      BERLIN,
    ).altitude;

    expect(altitude).toBeGreaterThan(30);
  });

  // An evening crescent points to the set sun: the lower right in the north,
  // the lower left in the south and straight down at the equator.
  it.each([
    {
      place: 'Berlin',
      location: BERLIN,
      time: '2026-12-13T16:30:00Z',
      from: 200,
      to: 270,
    },
    {
      place: 'Sydney',
      location: SYDNEY,
      time: '2026-12-13T09:30:00Z',
      from: 90,
      to: 160,
    },
    {
      place: 'Quito',
      location: QUITO,
      time: '2026-12-13T23:45:00Z',
      from: 170,
      to: 190,
    },
  ])(
    'should orient the evening crescent in $place',
    ({ location, time, from, to }) => {
      const angle = degrees(
        moonIllumination(new Date(time), location).brightLimbAngle,
      );

      expect(angle).toBeGreaterThan(from);
      expect(angle).toBeLessThan(to);
    },
  );
});
