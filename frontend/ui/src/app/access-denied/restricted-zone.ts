/*
 * Some time zones see only the access screen until the visitor enters the
 * password.
 *
 * src/index.html has a copy of this check as an inline script, so that a
 * prerendered page never paints for such a visitor before the app starts.
 * Keep both in step: restricted-zone.spec.ts runs the inline script against
 * the same cases as this file.
 */

/** Zone names that are restricted, in lower case. It includes an alias. */
export const RESTRICTED_ZONE_NAMES: readonly string[] = ['asia/tehran', 'iran'];

/**
 * The restricted UTC offset, as Date.getTimezoneOffset() gives it. No
 * other zone uses this offset, so it also catches a device that is set to a
 * plain offset, or that reports an unknown zone name.
 */
export const RESTRICTED_OFFSET = -210;

function reportedTimeZone(): string {
  try {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return typeof timeZone === 'string' ? timeZone.toLowerCase() : '';
  } catch {
    return '';
  }
}

/**
 * True when the browser runs in a restricted zone. It checks the zone name,
 * the offset now and the offset on 1 January, because a device with old
 * time zone data can show a summer offset for the zone.
 */
export function isRestrictedZone(now: Date = new Date()): boolean {
  const january = new Date(now.getFullYear(), 0, 1);

  return (
    RESTRICTED_ZONE_NAMES.includes(reportedTimeZone()) ||
    now.getTimezoneOffset() === RESTRICTED_OFFSET ||
    january.getTimezoneOffset() === RESTRICTED_OFFSET
  );
}
