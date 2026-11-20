import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  approximateLocation,
  browserTimeZone,
  locateTimeZone,
  parseTimeZoneCoordinates,
} from './time-zone-location';

describe('time zone location', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    { timeZone: 'Europe/Berlin', latitude: 52, longitude: 13 },
    { timeZone: 'Europe/Amsterdam', latitude: 52, longitude: 5 },
    { timeZone: 'Australia/Sydney', latitude: -34, longitude: 151 },
    {
      timeZone: 'America/Argentina/Buenos_Aires',
      latitude: -35,
      longitude: -58,
    },
    { timeZone: 'Asia/Calcutta', latitude: 23, longitude: 88 },
    { timeZone: 'Europe/Kiev', latitude: 50, longitude: 31 },
  ])('should locate $timeZone', async ({ timeZone, latitude, longitude }) => {
    await expect(locateTimeZone(timeZone)).resolves.toEqual({
      latitude,
      longitude,
    });
  });

  it.each(['UTC', 'Etc/GMT+3', 'Mars/Olympus_Mons'])(
    'should not locate %s',
    async (timeZone) => {
      await expect(locateTimeZone(timeZone)).resolves.toBeUndefined();
    },
  );

  it('should parse regions and entries that span lines', () => {
    const locations = parseTimeZoneCoordinates(`
Europe:
Berlin 53 13,Paris 49 2,
Rome 42 12
Asia:
Tokyo 36 140
`);

    expect([...locations.keys()]).toEqual([
      'Europe/Berlin',
      'Europe/Paris',
      'Europe/Rome',
      'Asia/Tokyo',
    ]);
  });

  it('should guess the longitude from the standard time offset', () => {
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(function (
      this: Date,
    ) {
      return this.getMonth() === 0 ? -60 : -120;
    });

    expect(approximateLocation(new Date(2026, 5, 1))).toEqual({
      latitude: 40,
      longitude: 15,
    });
  });

  it('should read the time zone of the browser', () => {
    expect(browserTimeZone()).toBe(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  });
});
