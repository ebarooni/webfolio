import { Theme } from '../../config/themes-array';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type HillColors = Readonly<{ back: string; front: string }>;

export const HILL_COLORS: Readonly<Record<Season, HillColors>> = {
  autumn: { back: '#e3b061', front: '#cf8f45' },
  spring: { back: '#8fd6a0', front: '#6bc088' },
  summer: { back: '#7ccb98', front: '#5db57e' },
  winter: { back: '#f2f6fb', front: '#dce6f0' },
};

const LOWEST_OFFSET = 5;
const ARC_HEIGHT = 8;
const HOURS_ABOVE_HORIZON = 12;
const SUNRISE_HOUR = 6;
const MOONRISE_HOUR = 18;
const HOURS_PER_DAY = 24;

// The seasons follow the northern hemisphere.
export function seasonOf(date: Date): Season {
  const month = date.getMonth();

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

// The sun is highest at noon and the moon is highest at midnight.
// The result is a vertical offset in SVG units. A larger value is lower.
export function celestialOffset(theme: Theme, date: Date): number {
  const hour = date.getHours() + date.getMinutes() / 60;
  const riseHour = theme === 'dark' ? MOONRISE_HOUR : SUNRISE_HOUR;
  const hoursSinceRise = (hour - riseHour + HOURS_PER_DAY) % HOURS_PER_DAY;
  const progress = hoursSinceRise / HOURS_ABOVE_HORIZON;

  if (progress > 1) {
    return LOWEST_OFFSET;
  }

  const offset = LOWEST_OFFSET - ARC_HEIGHT * Math.sin(Math.PI * progress);

  return Math.round(offset * 10) / 10;
}
