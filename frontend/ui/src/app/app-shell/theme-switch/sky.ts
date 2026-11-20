import {
  moonIllumination,
  moonPosition,
  sunPosition,
  type GeoLocation,
} from './astronomy';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type HillColors = Readonly<{ back: string; front: string }>;

export type SunLook = Readonly<{
  offset: number;
  core: string;
  glow: string;
  glowOpacity: number;
}>;

export type MoonLook = Readonly<{
  offset: number;
  litPath: string;
  rotation: number;
  glowOpacity: number;
}>;

export const HILL_COLORS: Readonly<Record<Season, HillColors>> = {
  autumn: { back: '#e3b061', front: '#cf8f45' },
  spring: { back: '#8fd6a0', front: '#6bc088' },
  summer: { back: '#7ccb98', front: '#5db57e' },
  winter: { back: '#f2f6fb', front: '#dce6f0' },
};

// The knob is a circle at (22, 20) with a radius of 11 in SVG units.
export const KNOB_CENTER_X = 22;
export const KNOB_CENTER_Y = 20;
export const KNOB_RADIUS = 11;

// A vertical offset of 5 puts the body on the hills. A larger value is lower.
const HORIZON_OFFSET = 5;
const ARC_HEIGHT = 8;
const DEEPEST_DIP = 3;
const TWILIGHT_DEGREES = 12;
const GOLDEN_HOUR_DEGREES = 20;
const TROPIC_LATITUDE = 23.44;
const MONTHS_PER_HALF_YEAR = 6;
const MONTHS_PER_YEAR = 12;
const RADIANS_PER_DEGREE = Math.PI / 180;

const SUN_CORE = { high: '#ffc533', low: '#ff8a3d' };
const SUN_GLOW = { high: '#ffd86b', low: '#ffa65c' };
const SUN_GLOW_OPACITY = { high: 0.35, low: 0.55 };
const MOON_GLOW_OPACITY = { new: 0.05, full: 0.2 };

function roundToTenth(value: number): number {
  return Math.round(value * 10) / 10 || 0;
}

function roundToHundredth(value: number): number {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, lowest: number, highest: number): number {
  return Math.min(highest, Math.max(lowest, value));
}

function mixHexColors(from: string, to: string, amount: number): string {
  const channels = [1, 3, 5].map((start) => {
    const fromChannel = parseInt(from.slice(start, start + 2), 16);
    const toChannel = parseInt(to.slice(start, start + 2), 16);
    const channel = Math.round(
      fromChannel + (toChannel - fromChannel) * amount,
    );

    return channel.toString(16).padStart(2, '0');
  });

  return `#${channels.join('')}`;
}

// Near the tropics the year has no real winter, so the hills stay green.
// South of the equator the seasons are half a year apart from the north.
export function seasonOf(date: Date, latitude: number): Season {
  if (Math.abs(latitude) < TROPIC_LATITUDE) {
    return 'summer';
  }

  const month =
    latitude < 0
      ? (date.getMonth() + MONTHS_PER_HALF_YEAR) % MONTHS_PER_YEAR
      : date.getMonth();

  if (month <= 1 || month === 11) {
    return 'winter';
  }

  if (month <= 4) {
    return 'spring';
  }

  if (month <= 7) {
    return 'summer';
  }

  return 'autumn';
}

// A body high in the sky is near the top of the button. Below the horizon,
// it sinks behind the hills but stays visible, because it is the knob.
export function celestialOffset(altitude: number): number {
  if (altitude >= 0) {
    return roundToTenth(
      HORIZON_OFFSET - ARC_HEIGHT * Math.sin(altitude * RADIANS_PER_DEGREE),
    );
  }

  const twilightProgress = Math.min(1, -altitude / TWILIGHT_DEGREES);

  return roundToTenth(HORIZON_OFFSET + DEEPEST_DIP * twilightProgress);
}

// The lit part of the moon, with the lit limb on the right side.
// The terminator is half an ellipse. Its width depends on the phase.
export function moonLitPath(fraction: number): string {
  const top = KNOB_CENTER_Y - KNOB_RADIUS;
  const bottom = KNOB_CENTER_Y + KNOB_RADIUS;
  const terminatorRadius = roundToTenth(
    KNOB_RADIUS * Math.abs(1 - 2 * fraction),
  );
  const terminatorSweep = fraction > 0.5 ? 1 : 0;

  return (
    `M${KNOB_CENTER_X} ${top}` +
    `A${KNOB_RADIUS} ${KNOB_RADIUS} 0 0 1 ${KNOB_CENTER_X} ${bottom}` +
    `A${terminatorRadius} ${KNOB_RADIUS} 0 0 ${terminatorSweep} ${KNOB_CENTER_X} ${top}Z`
  );
}

// The SVG rotation that turns the lit limb from the right side to the side
// where the observer sees it. SVG angles turn clockwise because y points down.
export function moonRotation(brightLimbAngle: number): number {
  const rightward = -Math.sin(brightLimbAngle);
  const downward = -Math.cos(brightLimbAngle);

  return roundToTenth(Math.atan2(downward, rightward) / RADIANS_PER_DEGREE);
}

// A low sun is more orange, as at sunrise and sunset.
export function sunLook(date: Date, location: GeoLocation): SunLook {
  const { altitude } = sunPosition(date, location);
  const height = clamp(altitude / GOLDEN_HOUR_DEGREES, 0, 1);

  return {
    offset: celestialOffset(altitude),
    core: mixHexColors(SUN_CORE.low, SUN_CORE.high, height),
    glow: mixHexColors(SUN_GLOW.low, SUN_GLOW.high, height),
    glowOpacity: roundToTenth(
      SUN_GLOW_OPACITY.low +
        (SUN_GLOW_OPACITY.high - SUN_GLOW_OPACITY.low) * height,
    ),
  };
}

export function moonLook(date: Date, location: GeoLocation): MoonLook {
  const { altitude } = moonPosition(date, location);
  const { fraction, brightLimbAngle } = moonIllumination(date, location);

  return {
    offset: celestialOffset(altitude),
    litPath: moonLitPath(fraction),
    rotation: moonRotation(brightLimbAngle),
    glowOpacity: roundToHundredth(
      MOON_GLOW_OPACITY.new +
        (MOON_GLOW_OPACITY.full - MOON_GLOW_OPACITY.new) * fraction,
    ),
  };
}
