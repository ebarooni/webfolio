import type { GeoLocation } from './astronomy';
import { TIME_ZONE_COORDINATES } from './time-zone-coordinates';

let knownLocations: ReadonlyMap<string, GeoLocation> | undefined;

// The browser does not tell the location without a permission prompt.
// The time zone is known without one, and its main city is near enough.
export function browserTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
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

// A zone without a city, such as UTC, gives no location. The sky then
// shows its neutral look instead of a guess.
export function locateTimeZone(timeZone: string): GeoLocation | undefined {
  knownLocations ??= parseTimeZoneCoordinates(TIME_ZONE_COORDINATES);

  return knownLocations.get(timeZone);
}

export function locateVisitor(): GeoLocation | undefined {
  const timeZone = browserTimeZone();

  return timeZone ? locateTimeZone(timeZone) : undefined;
}
