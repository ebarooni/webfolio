import type { GeoLocation } from './astronomy';

// Most visitors live in the northern mid-latitudes.
const FALLBACK_LATITUDE = 40;
const MINUTES_PER_DEGREE = 4;

// The browser does not tell the location without a permission prompt.
// The time zone is known without one, and its main city is near enough.
export function browserTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}

// The standard time offset gives the longitude to about 15 degrees.
export function approximateLocation(date: Date): GeoLocation {
  const year = date.getFullYear();
  const standardOffsetMinutes = Math.max(
    new Date(year, 0, 1).getTimezoneOffset(),
    new Date(year, 6, 1).getTimezoneOffset(),
  );

  return {
    latitude: FALLBACK_LATITUDE,
    longitude: -standardOffsetMinutes / MINUTES_PER_DEGREE,
  };
}

export function parseTimeZoneCoordinates(
  table: string,
): ReadonlyMap<string, GeoLocation> {
  const locations = new Map<string, GeoLocation>();
  let region = '';

  for (const entry of table.split(/[,\n]/)) {
    const trimmedEntry = entry.trim();

    if (trimmedEntry.endsWith(':')) {
      region = trimmedEntry.slice(0, -1);
      continue;
    }

    const [city, latitude, longitude] = trimmedEntry.split(' ');

    if (city && latitude && longitude) {
      locations.set(`${region}/${city}`, {
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
    }
  }

  return locations;
}

// The table loads in its own chunk, so it does not delay the first paint.
export async function locateTimeZone(
  timeZone: string,
): Promise<GeoLocation | undefined> {
  const { TIME_ZONE_COORDINATES } = await import('./time-zone-coordinates');

  return parseTimeZoneCoordinates(TIME_ZONE_COORDINATES).get(timeZone);
}
