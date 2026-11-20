import { Component } from '@angular/core';

import { SectionHeading } from '../section-heading/section-heading';

type Feature = Readonly<{
  id: string;
  title: string;
  body: string;
  chips: readonly string[];
  span?: 'wide' | 'full';
}>;

/*
 * Each feature and chip comes from the README and the option tables of
 * @ebarooni/capacitor-calendar 8.11.0.
 */
const FEATURES: readonly Feature[] = [
  {
    id: 'events',
    title: 'Everything an event needs',
    body: 'Create, modify, delete and list events with one call each. Set the details that real apps need, not only a title and a time.',
    chips: [
      'alerts',
      'attendees',
      'recurrence',
      'isAllDay',
      'availability',
      'location',
      'url',
      'color',
      'organizer',
    ],
    span: 'wide',
  },
  {
    id: 'prompts',
    title: 'Native editor prompts',
    body: 'Let the user create, edit or delete an event in the system calendar UI that they already know.',
    chips: ['createEventWithPrompt', 'modifyEventWithPrompt'],
  },
  {
    id: 'ranges',
    title: 'Events in any range',
    body: 'listEventsInRange returns every event that overlaps the range, multi-day events included.',
    chips: ['from', 'to'],
  },
  {
    id: 'calendars',
    title: 'Calendars, managed',
    body: 'List calendars, find the default one, and create, modify or delete your own. Open the Calendar app with one call.',
    chips: ['listCalendars', 'createCalendar', 'openCalendar'],
  },
  {
    id: 'reminders',
    title: 'Apple Reminders on iOS',
    body: 'Reminders and reminder lists, with full read and write access. Fourteen reminder methods, on iOS only.',
    chips: ['createReminder', 'getRemindersLists'],
  },
  {
    id: 'web',
    title: '.ics files on the web',
    body: 'In the browser, createEvent returns a downloadable .ics file instead of writing to a device calendar. Same call, same options.',
    chips: ['icsFileName', 'autoDownloadIcsFile'],
  },
  {
    id: 'permissions',
    title: 'iOS 17 access levels',
    body: 'Ask for write-only or full calendar access, as Apple requires since iOS 17. Check and request each scope on its own.',
    chips: ['requestWriteOnlyCalendarAccess', 'checkAllPermissions'],
  },
  {
    id: 'errors',
    title: 'Errors you can handle',
    body: 'Rejected calls on Android and iOS can carry a stable code and an exact message. Compare codes with an exported enum.',
    chips: ['EB-CLDR-0020', 'CapacitorCalendarErrorCode'],
  },
  {
    id: 'mcp',
    title: 'An MCP server for your AI assistant',
    body: 'The plugin ships an official MCP server. It gives AI coding assistants accurate, grounded knowledge of the plugin, so they write calls that work.',
    chips: ['ghcr.io/ebarooni/capacitor-calendar-mcp'],
    span: 'full',
  },
];

@Component({
  selector: 'app-capacitor-calendar-features',
  imports: [SectionHeading],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class CapacitorCalendarFeatures {
  readonly features = FEATURES;
}
