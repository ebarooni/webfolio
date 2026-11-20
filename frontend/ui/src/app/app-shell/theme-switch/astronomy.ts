// Low-precision positions of the sun and the moon, after the formulas in
// "Astronomy Answers" by Aphthonius Strous, as SunCalc also uses them.
// The error is well below one degree, which is less than one pixel here.

export type GeoLocation = Readonly<{ latitude: number; longitude: number }>;

export type SkyPosition = Readonly<{
  // Degrees above the horizon. A negative value is below the horizon.
  altitude: number;
  // Radians. The angle from the north celestial pole to the zenith,
  // measured at the body.
  parallacticAngle: number;
}>;

export type MoonIllumination = Readonly<{
  // 0 is a new moon, 0.5 is a half moon and 1 is a full moon.
  fraction: number;
  // Radians. The direction of the lit limb, measured on the sky from the
  // zenith toward the east (counterclockwise as the observer sees it).
  brightLimbAngle: number;
}>;

type Equatorial = Readonly<{
  rightAscension: number;
  declination: number;
  distanceKm: number;
}>;

const RADIANS_PER_DEGREE = Math.PI / 180;
const MS_PER_DAY = 86_400_000;
const J2000_MS = Date.UTC(2000, 0, 1, 12);
const EARTH_OBLIQUITY = 23.4397 * RADIANS_PER_DEGREE;
const SUN_DISTANCE_KM = 149_598_000;

// Rounding can push a sine or cosine a little past 1, which gives NaN.
function safeAsin(value: number): number {
  return Math.asin(Math.min(1, Math.max(-1, value)));
}

function safeAcos(value: number): number {
  return Math.acos(Math.min(1, Math.max(-1, value)));
}

function daysSinceJ2000(date: Date): number {
  return (date.getTime() - J2000_MS) / MS_PER_DAY;
}

function toEquatorial(
  eclipticLongitude: number,
  eclipticLatitude: number,
  distanceKm: number,
): Equatorial {
  const rightAscension = Math.atan2(
    Math.sin(eclipticLongitude) * Math.cos(EARTH_OBLIQUITY) -
      Math.tan(eclipticLatitude) * Math.sin(EARTH_OBLIQUITY),
    Math.cos(eclipticLongitude),
  );
  const declination = safeAsin(
    Math.sin(eclipticLatitude) * Math.cos(EARTH_OBLIQUITY) +
      Math.cos(eclipticLatitude) *
        Math.sin(EARTH_OBLIQUITY) *
        Math.sin(eclipticLongitude),
  );

  return { rightAscension, declination, distanceKm };
}

function sunEquatorial(days: number): Equatorial {
  const meanAnomaly = (357.5291 + 0.98560028 * days) * RADIANS_PER_DEGREE;
  const center =
    (1.9148 * Math.sin(meanAnomaly) +
      0.02 * Math.sin(2 * meanAnomaly) +
      0.0003 * Math.sin(3 * meanAnomaly)) *
    RADIANS_PER_DEGREE;
  const perihelion = 102.9372 * RADIANS_PER_DEGREE;

  return toEquatorial(
    meanAnomaly + center + perihelion + Math.PI,
    0,
    SUN_DISTANCE_KM,
  );
}

function moonEquatorial(days: number): Equatorial {
  const meanLongitude = (218.316 + 13.176396 * days) * RADIANS_PER_DEGREE;
  const meanAnomaly = (134.963 + 13.064993 * days) * RADIANS_PER_DEGREE;
  const argumentOfLatitude = (93.272 + 13.22935 * days) * RADIANS_PER_DEGREE;

  return toEquatorial(
    meanLongitude + 6.289 * RADIANS_PER_DEGREE * Math.sin(meanAnomaly),
    5.128 * RADIANS_PER_DEGREE * Math.sin(argumentOfLatitude),
    385_001 - 20_905 * Math.cos(meanAnomaly),
  );
}

function skyPosition(
  body: Equatorial,
  days: number,
  location: GeoLocation,
): SkyPosition {
  const latitude = location.latitude * RADIANS_PER_DEGREE;
  const siderealTime =
    (280.16 + 360.9856235 * days + location.longitude) * RADIANS_PER_DEGREE;
  const hourAngle = siderealTime - body.rightAscension;
  const altitude = safeAsin(
    Math.sin(latitude) * Math.sin(body.declination) +
      Math.cos(latitude) * Math.cos(body.declination) * Math.cos(hourAngle),
  );
  const parallacticAngle = Math.atan2(
    Math.sin(hourAngle),
    Math.tan(latitude) * Math.cos(body.declination) -
      Math.sin(body.declination) * Math.cos(hourAngle),
  );

  return { altitude: altitude / RADIANS_PER_DEGREE, parallacticAngle };
}

export function sunPosition(date: Date, location: GeoLocation): SkyPosition {
  const days = daysSinceJ2000(date);

  return skyPosition(sunEquatorial(days), days, location);
}

export function moonPosition(date: Date, location: GeoLocation): SkyPosition {
  const days = daysSinceJ2000(date);

  return skyPosition(moonEquatorial(days), days, location);
}

export function moonIllumination(
  date: Date,
  location: GeoLocation,
): MoonIllumination {
  const days = daysSinceJ2000(date);
  const sun = sunEquatorial(days);
  const moon = moonEquatorial(days);
  const rightAscensionGap = sun.rightAscension - moon.rightAscension;
  const elongation = safeAcos(
    Math.sin(sun.declination) * Math.sin(moon.declination) +
      Math.cos(sun.declination) *
        Math.cos(moon.declination) *
        Math.cos(rightAscensionGap),
  );
  const phaseAngle = Math.atan2(
    sun.distanceKm * Math.sin(elongation),
    moon.distanceKm - sun.distanceKm * Math.cos(elongation),
  );
  // The position angle of the lit limb, from the celestial north pole.
  const positionAngle = Math.atan2(
    Math.cos(sun.declination) * Math.sin(rightAscensionGap),
    Math.sin(sun.declination) * Math.cos(moon.declination) -
      Math.cos(sun.declination) *
        Math.sin(moon.declination) *
        Math.cos(rightAscensionGap),
  );
  const { parallacticAngle } = skyPosition(moon, days, location);

  return {
    fraction: (1 + Math.cos(phaseAngle)) / 2,
    brightLimbAngle: positionAngle - parallacticAngle,
  };
}
