import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  calendar: 'Calendar',
  weekday: 'Mon',
  saved: 'Saved',
  eventTitle: 'Product review',
  eventPlace: 'Office',
  eventTime: '15:00 to 16:00',
} as const;

type HeroVisualCopy = CopyShape<typeof en>;

export const HERO_VISUAL_COPY: LocalizedCopy<HeroVisualCopy> = {
  en,
  de: {
    weekdays: ['M', 'D', 'M', 'D', 'F', 'S', 'S'],
    calendar: 'Kalender',
    weekday: 'Mo',
    saved: 'Gespeichert',
    eventTitle: 'Produkt-Review',
    eventPlace: 'Büro',
    eventTime: '15:00 bis 16:00',
  },
  nl: {
    weekdays: ['M', 'D', 'W', 'D', 'V', 'Z', 'Z'],
    calendar: 'Agenda',
    weekday: 'ma',
    saved: 'Opgeslagen',
    eventTitle: 'Productreview',
    eventPlace: 'Kantoor',
    eventTime: '15:00 tot 16:00',
  },
};
