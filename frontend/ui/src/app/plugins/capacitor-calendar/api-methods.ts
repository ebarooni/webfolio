/*
 * The public methods of @ebarooni/capacitor-calendar 8.11.0 and their
 * platforms, from dist/docs.json. The summaries are shortened from the
 * JSDoc of each method.
 */

export type Platform = 'iOS' | 'Android' | 'Web';

export type ApiMethod = Readonly<{
  name: string;
  summary: string;
  platforms: readonly Platform[];
}>;

export type ApiGroup = Readonly<{
  id: string;
  title: string;
  description: string;
  methods: readonly ApiMethod[];
}>;

const MOBILE: readonly Platform[] = ['iOS', 'Android'];
const ALL: readonly Platform[] = ['iOS', 'Android', 'Web'];
const IOS: readonly Platform[] = ['iOS'];
const ANDROID: readonly Platform[] = ['Android'];

export const API_GROUPS: readonly ApiGroup[] = [
  {
    id: 'events',
    title: 'Events',
    description:
      'Create, read, change and delete events, with or without the system editor.',
    methods: [
      {
        name: 'createEvent',
        summary: 'Create an event. On the web, build an .ics file.',
        platforms: ALL,
      },
      {
        name: 'createEventWithPrompt',
        summary: 'Open the system editor to create an event.',
        platforms: ALL,
      },
      {
        name: 'modifyEvent',
        summary: 'Change an event. Omitted fields keep their values.',
        platforms: MOBILE,
      },
      {
        name: 'modifyEventWithPrompt',
        summary: 'Open the system editor to change an event.',
        platforms: MOBILE,
      },
      {
        name: 'listEventsInRange',
        summary: 'Get the events that overlap a date range.',
        platforms: MOBILE,
      },
      {
        name: 'getEventById',
        summary: 'Get one event by its id.',
        platforms: MOBILE,
      },
      {
        name: 'deleteEvent',
        summary: 'Delete an event.',
        platforms: MOBILE,
      },
      {
        name: 'deleteEventsById',
        summary: 'Delete several events at once.',
        platforms: MOBILE,
      },
      {
        name: 'deleteEventWithPrompt',
        summary: 'Ask the user before an event is deleted.',
        platforms: MOBILE,
      },
      {
        name: 'commit',
        summary: 'Save pending calendar changes.',
        platforms: IOS,
      },
    ],
  },
  {
    id: 'calendars',
    title: 'Calendars',
    description:
      'Find, create and manage the calendars that hold the events, and open the Calendar app.',
    methods: [
      {
        name: 'listCalendars',
        summary: 'Get all available calendars.',
        platforms: MOBILE,
      },
      {
        name: 'getDefaultCalendar',
        summary: 'Get the default calendar.',
        platforms: MOBILE,
      },
      {
        name: 'createCalendar',
        summary: 'Create a calendar with a title and a color.',
        platforms: MOBILE,
      },
      {
        name: 'modifyCalendar',
        summary: 'Change a calendar.',
        platforms: MOBILE,
      },
      {
        name: 'deleteCalendar',
        summary: 'Delete a calendar by its id.',
        platforms: MOBILE,
      },
      {
        name: 'openCalendar',
        summary: 'Open the Calendar app.',
        platforms: MOBILE,
      },
      {
        name: 'selectCalendarsWithPrompt',
        summary: 'Let the user pick calendars in the system interface.',
        platforms: IOS,
      },
      {
        name: 'fetchAllCalendarSources',
        summary: 'Get the calendar sources.',
        platforms: IOS,
      },
    ],
  },
  {
    id: 'permissions',
    title: 'Permissions',
    description:
      'Check and request exactly the access your app needs, including the iOS 17 access levels.',
    methods: [
      {
        name: 'checkPermission',
        summary: 'Get the permission state of one scope.',
        platforms: MOBILE,
      },
      {
        name: 'checkAllPermissions',
        summary: 'Get the state of all permissions.',
        platforms: MOBILE,
      },
      {
        name: 'requestPermission',
        summary: 'Request the permission of one scope.',
        platforms: MOBILE,
      },
      {
        name: 'requestAllPermissions',
        summary: 'Request all calendar and reminder permissions.',
        platforms: MOBILE,
      },
      {
        name: 'requestWriteOnlyCalendarAccess',
        summary: 'Request write access to the calendar.',
        platforms: MOBILE,
      },
      {
        name: 'requestReadOnlyCalendarAccess',
        summary: 'Request read access to the calendar.',
        platforms: ANDROID,
      },
      {
        name: 'requestFullCalendarAccess',
        summary: 'Request read and write access to the calendar.',
        platforms: MOBILE,
      },
      {
        name: 'requestFullRemindersAccess',
        summary: 'Request read and write access to the reminders.',
        platforms: IOS,
      },
    ],
  },
  {
    id: 'reminders',
    title: 'Reminders',
    description:
      'Full access to Apple Reminders: reminders, reminder lists and their sources.',
    methods: [
      {
        name: 'createReminder',
        summary: 'Create a reminder.',
        platforms: IOS,
      },
      {
        name: 'modifyReminder',
        summary: 'Change a reminder.',
        platforms: IOS,
      },
      {
        name: 'getReminderById',
        summary: 'Get one reminder by its id.',
        platforms: IOS,
      },
      {
        name: 'getRemindersFromLists',
        summary: 'Get the reminders of several lists.',
        platforms: IOS,
      },
      {
        name: 'deleteReminder',
        summary: 'Delete a reminder.',
        platforms: IOS,
      },
      {
        name: 'deleteRemindersById',
        summary: 'Delete several reminders at once.',
        platforms: IOS,
      },
      {
        name: 'deleteReminderWithPrompt',
        summary: 'Ask the user before a reminder is deleted.',
        platforms: IOS,
      },
      {
        name: 'getRemindersLists',
        summary: 'Get all reminder lists.',
        platforms: IOS,
      },
      {
        name: 'getDefaultRemindersList',
        summary: 'Get the default reminder list.',
        platforms: IOS,
      },
      {
        name: 'createRemindersList',
        summary: 'Create a reminder list.',
        platforms: IOS,
      },
      {
        name: 'updateRemindersList',
        summary: 'Change a reminder list.',
        platforms: IOS,
      },
      {
        name: 'deleteRemindersList',
        summary: 'Delete a reminder list.',
        platforms: IOS,
      },
      {
        name: 'fetchAllRemindersSources',
        summary: 'Get the reminder sources.',
        platforms: IOS,
      },
      {
        name: 'openReminders',
        summary: 'Open the Reminders app.',
        platforms: IOS,
      },
    ],
  },
];

export const API_METHOD_COUNT = API_GROUPS.reduce(
  (count, group) => count + group.methods.length,
  0,
);
