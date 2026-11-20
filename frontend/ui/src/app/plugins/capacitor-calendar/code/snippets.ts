import { PACKAGE_MANAGERS } from '../capacitor-calendar.content';
import { type CodeTab } from './code-tabs/code-tabs';

/*
 * The code samples follow the README of @ebarooni/capacitor-calendar.
 * Keep them in sync with it, so that a copied sample works.
 */

export const INSTALL_TABS: readonly CodeTab[] = PACKAGE_MANAGERS.map(
  (manager) => ({
    id: manager.id,
    title: manager.name,
    label: 'Terminal',
    code: manager.command,
    language: 'shell',
  }),
);

export const PERMISSION_TABS: readonly CodeTab[] = [
  {
    id: 'ios',
    title: 'iOS',
    label: 'ios/App/App/Info.plist',
    language: 'xml',
    code: `<!-- Only include the keys your app needs. -->
<key>NSCalendarsUsageDescription</key>
<string>This app needs access to your calendar.</string>

<key>NSCalendarsWriteOnlyAccessUsageDescription</key>
<string>This app needs permission to create calendar events.</string>

<key>NSCalendarsFullAccessUsageDescription</key>
<string>This app needs permission to read and manage your calendar events.</string>

<key>NSRemindersUsageDescription</key>
<string>This app needs access to your reminders.</string>

<key>NSRemindersFullAccessUsageDescription</key>
<string>This app needs permission to read and manage your reminders.</string>`,
  },
  {
    id: 'android',
    title: 'Android',
    label: 'android/app/src/main/AndroidManifest.xml',
    language: 'xml',
    code: `<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.WRITE_CALENDAR" />`,
  },
];

export const QUICK_START_TABS: readonly CodeTab[] = [
  {
    id: 'event',
    title: 'Create an event',
    label: 'create-event.ts',
    language: 'typescript',
    code: `import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

const { result } = await CapacitorCalendar.requestFullCalendarAccess();

if (result !== 'granted') {
  throw new Error('Calendar permission denied');
}

// Create an event starting in 1 hour, lasting 1 hour
const startDate = Date.now() + 60 * 60 * 1000;
const endDate = startDate + 60 * 60 * 1000;

const { id } = await CapacitorCalendar.createEvent({
  title: 'Product review',
  location: 'Office',
  startDate,
  endDate,
  description: 'Created with @ebarooni/capacitor-calendar',
});`,
  },
  {
    id: 'list',
    title: 'List events',
    label: 'list-events.ts',
    language: 'typescript',
    code: `import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

const now = Date.now();
const oneWeekLater = now + 7 * 24 * 60 * 60 * 1000;

// Returns every event that overlaps the range
const { result: events } = await CapacitorCalendar.listEventsInRange({
  from: now,
  to: oneWeekLater,
});`,
  },
  {
    id: 'prompt',
    title: 'Native editor',
    label: 'event-editor.ts',
    language: 'typescript',
    code: `import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

// Opens the system editor. On the web: a confirm dialog and an .ics file
await CapacitorCalendar.createEventWithPrompt({
  title: 'Planning session',
  location: 'Office',
  startDate: Date.now() + 24 * 60 * 60 * 1000,
  endDate: Date.now() + 25 * 60 * 60 * 1000,
});`,
  },
  {
    id: 'web',
    title: 'Web (.ics)',
    label: 'web-ics.ts',
    language: 'typescript',
    code: `import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

const startDate = Date.now() + 60 * 60 * 1000;
const endDate = startDate + 60 * 60 * 1000;

// On the web, createEvent builds a downloadable .ics file
const { ics } = await CapacitorCalendar.createEvent({
  title: 'Team standup',
  startDate,
  endDate,
  icsFileName: 'team-standup.ics',
  autoDownloadIcsFile: true,
});`,
  },
  {
    id: 'reminder',
    title: 'Reminder (iOS)',
    label: 'create-reminder.ts',
    language: 'typescript',
    code: `import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

const { result } = await CapacitorCalendar.requestFullRemindersAccess();

if (result === 'granted') {
  await CapacitorCalendar.createReminder({
    title: 'Send launch notes',
    dueDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
    notes: 'Created with @ebarooni/capacitor-calendar',
  });
}`,
  },
];

/** The short sample in the hero. It is the start of the quick start. */
export const HERO_SNIPPET = `import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

await CapacitorCalendar.requestFullCalendarAccess();

const { id } = await CapacitorCalendar.createEvent({
  title: 'Product review',
  location: 'Office',
  startDate,
  endDate,
});`;
