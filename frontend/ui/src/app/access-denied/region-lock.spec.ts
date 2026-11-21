import { afterEach, describe, expect, it, vi } from 'vitest';

import { isLockedTimeZone } from './region-lock';

interface Visitor {
  /** The zone name the browser reports. */
  zone: string;
  /** Date.getTimezoneOffset() in July and in January. */
  offset: { july: number; january: number };
}

const TEHRAN = { july: -210, january: -210 };

// Iran time on a device whose time zone data still has summer time.
const TEHRAN_OLD_DATA = { july: -270, january: -210 };

const CASES: readonly (Visitor & { name: string; locked: boolean })[] = [
  { name: 'Asia/Tehran', zone: 'Asia/Tehran', offset: TEHRAN, locked: true },
  { name: 'the old alias Iran', zone: 'Iran', offset: TEHRAN, locked: true },
  {
    // A system set to "Iran" without time zone data for it runs on UTC.
    name: 'the alias Iran without zone data',
    zone: 'Iran',
    offset: { july: 0, january: 0 },
    locked: true,
  },
  {
    name: 'a name in other letter case',
    zone: 'asia/TEHRAN',
    offset: TEHRAN,
    locked: true,
  },
  {
    name: 'a plain +03:30 offset',
    zone: '+03:30',
    offset: TEHRAN,
    locked: true,
  },
  {
    name: 'an unknown zone name on Iran time',
    zone: 'Etc/Unknown',
    offset: TEHRAN,
    locked: true,
  },
  {
    name: 'old time zone data in summer',
    zone: 'Asia/Tehran',
    offset: TEHRAN_OLD_DATA,
    locked: true,
  },
  {
    name: 'no zone name on Iran time',
    zone: '',
    offset: TEHRAN,
    locked: true,
  },
  {
    name: 'Europe/Berlin',
    zone: 'Europe/Berlin',
    offset: { july: -120, january: -60 },
    locked: false,
  },
  {
    name: 'Asia/Kabul (UTC+04:30)',
    zone: 'Asia/Kabul',
    offset: { july: -270, january: -270 },
    locked: false,
  },
  {
    name: 'Asia/Dubai (UTC+04:00)',
    zone: 'Asia/Dubai',
    offset: { july: -240, january: -240 },
    locked: false,
  },
  {
    name: 'Asia/Kolkata (UTC+05:30)',
    zone: 'Asia/Kolkata',
    offset: { july: -330, january: -330 },
    locked: false,
  },
  { name: 'UTC', zone: 'UTC', offset: { july: 0, january: 0 }, locked: false },
];

const JULY = new Date(2026, 6, 15, 12);

function offsetFor(date: Date, offset: Visitor['offset']): number {
  return date.getMonth() === 0 ? offset.january : offset.july;
}

function mockBrowser({ zone, offset }: Visitor): void {
  vi.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
    resolvedOptions: () =>
      ({ timeZone: zone }) as Intl.ResolvedDateTimeFormatOptions,
  } as Intl.DateTimeFormat);
  vi.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(function (
    this: Date,
  ) {
    return offsetFor(this, offset);
  });
}

// The specs run in Node. A module name in a variable keeps the Node module
// out of the browser types of this project.
const NODE_FS = 'node:fs';
const { readFileSync } = (await import(NODE_FS)) as {
  readFileSync: (path: string, encoding: 'utf8') => string;
};
const INDEX_HTML = readFileSync('src/index.html', 'utf8');

/** The inline region lock script of index.html. */
function inlineScript(): string {
  const scripts = [...INDEX_HTML.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const script = scripts.find(([, code]) => code.includes('access-denied'));
  if (!script) {
    throw new Error('index.html has no region lock script');
  }
  return script[1];
}

interface PageResult {
  hidden: boolean;
  redirectedTo: string | null;
}

/** Runs the inline script as a page load at the given path would. */
function loadPage(
  visitor: Visitor,
  options: { path?: string; stored?: string | null; storage?: 'blocked' } = {},
): PageResult {
  const { offset, zone } = visitor;
  const result: PageResult = { hidden: false, redirectedTo: null };

  class VisitorDate extends Date {
    constructor(...args: [] | [number, number, number]) {
      if (args.length === 0) {
        super(JULY.getTime());
      } else {
        super(...args);
      }
    }

    override getTimezoneOffset(): number {
      return offsetFor(this, offset);
    }
  }

  const intl = {
    DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: zone }) }),
  };
  const localStorage = {
    getItem: (): string | null => {
      if (options.storage === 'blocked') {
        throw new Error('SecurityError');
      }
      return options.stored ?? null;
    },
  };
  const location = {
    pathname: options.path ?? '/',
    replace: (url: string) => (result.redirectedTo = url),
  };
  const document = {
    documentElement: {
      style: {
        set display(value: string) {
          result.hidden = value === 'none';
        },
      },
    },
  };

  // The script sees these stand-ins in place of the browser globals.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const run = new Function(
    'Intl',
    'Date',
    'localStorage',
    'location',
    'document',
    inlineScript(),
  ) as (...globals: unknown[]) => void;
  run(intl, VisitorDate, localStorage, location, document);

  return result;
}

describe('region lock', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isLockedTimeZone', () => {
    for (const visitor of CASES) {
      it(`${visitor.locked ? 'locks' : 'does not lock'} ${visitor.name}`, () => {
        mockBrowser(visitor);
        expect(isLockedTimeZone(JULY)).toBe(visitor.locked);
      });
    }

    it('locks Iran time when the browser cannot report a zone', () => {
      mockBrowser({ zone: '', offset: TEHRAN });
      vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
        throw new RangeError('no time zone');
      });
      expect(isLockedTimeZone(JULY)).toBe(true);
    });
  });

  describe('inline script in index.html', () => {
    for (const visitor of CASES) {
      it(`agrees with isLockedTimeZone for ${visitor.name}`, () => {
        const page = loadPage(visitor, { path: '/blog/some-post' });

        expect(page.hidden).toBe(visitor.locked);
        expect(page.redirectedTo).toBe(
          visitor.locked ? '/access-denied' : null,
        );
      });
    }

    it('hides every page before it paints and sends it to the gate', () => {
      for (const path of [
        '/',
        '/plugins/capacitor-calendar',
        '/de/blog',
        '/nl/contact/',
        '/unknown',
      ]) {
        expect(loadPage(CASES[0], { path })).toEqual({
          hidden: true,
          redirectedTo: '/access-denied',
        });
      }
    });

    it('leaves the gate itself alone', () => {
      for (const path of ['/access-denied', '/access-denied/']) {
        expect(loadPage(CASES[0], { path })).toEqual({
          hidden: false,
          redirectedTo: null,
        });
      }
    });

    it('lets a visitor who entered the password in', () => {
      const page = loadPage(CASES[0], {
        stored: JSON.stringify({ hasGeoAccess: true, theme: 'dark' }),
      });

      expect(page).toEqual({ hidden: false, redirectedTo: null });
    });

    it('keeps the lock for stored state without a real unlock', () => {
      for (const stored of [
        JSON.stringify({ hasGeoAccess: false }),
        JSON.stringify({ hasGeoAccess: 'true' }),
        '{not json',
        'null',
      ]) {
        expect(loadPage(CASES[0], { stored }).redirectedTo).toBe(
          '/access-denied',
        );
      }
    });

    it('keeps the lock when the browser blocks storage', () => {
      expect(loadPage(CASES[0], { storage: 'blocked' }).redirectedTo).toBe(
        '/access-denied',
      );
    });

    it('runs before the app and before any page content', () => {
      const lockAt = INDEX_HTML.indexOf('access-denied');
      expect(lockAt).toBeGreaterThan(0);
      expect(lockAt).toBeLessThan(INDEX_HTML.indexOf('<body'));
      expect(lockAt).toBeLessThan(INDEX_HTML.indexOf('<link'));
    });
  });
});
