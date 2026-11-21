/*
 * The region lock: a visitor whose browser is set to Iran time sees only
 * the access screen until they enter the password.
 *
 * src/index.html has a copy of this check as an inline script, so that a
 * prerendered page never paints for such a visitor before the app starts.
 * Keep both in step: region-lock.spec.ts runs the inline script against
 * the same cases as this file.
 */

/**
 * Names a browser can report for Iran time, in lower case. "Iran" is the
 * old alias of Asia/Tehran that some systems still report.
 */
export const LOCKED_TIME_ZONES: readonly string[] = ['asia/tehran', 'iran'];

/**
 * Iran Standard Time, UTC+03:30, as Date.getTimezoneOffset() gives it. No
 * other time zone uses this offset, so it also catches a device that is set
 * to a plain "GMT+03:30" offset, or that reports an unknown zone name.
 */
export const LOCKED_TIMEZONE_OFFSET = -210;

function reportedTimeZone(): string {
  try {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return typeof timeZone === 'string' ? timeZone.toLowerCase() : '';
  } catch {
    return '';
  }
}

/**
 * True when the browser runs on Iran time. It checks the zone name, the
 * offset now and the offset on 1 January, because a device with old time
 * zone data still moves Iran to UTC+04:30 in summer.
 */
export function isLockedTimeZone(now: Date = new Date()): boolean {
  const january = new Date(now.getFullYear(), 0, 1);

  return (
    LOCKED_TIME_ZONES.includes(reportedTimeZone()) ||
    now.getTimezoneOffset() === LOCKED_TIMEZONE_OFFSET ||
    january.getTimezoneOffset() === LOCKED_TIMEZONE_OFFSET
  );
}
