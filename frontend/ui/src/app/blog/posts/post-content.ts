import { Type } from '@angular/core';

import { Language } from '../../config/languages';
import { Posts } from '../post-catalog';
import { AstroToAngular } from './astro-to-angular/astro-to-angular';
import { AstroToAngularDe } from './astro-to-angular/astro-to-angular-de';
import { AstroToAngularNl } from './astro-to-angular/astro-to-angular-nl';
import { CapacitorCalendarPost } from './capacitor-calendar/capacitor-calendar';
import { CapacitorCalendarPostDe } from './capacitor-calendar/capacitor-calendar-de';
import { CapacitorCalendarPostNl } from './capacitor-calendar/capacitor-calendar-nl';
import { VpsHosting } from './vps-hosting/vps-hosting';
import { VpsHostingDe } from './vps-hosting/vps-hosting-de';
import { VpsHostingNl } from './vps-hosting/vps-hosting-nl';

type PostTranslations = Readonly<
  { en: Type<unknown> } & Partial<Record<Language, Type<unknown>>>
>;

/**
 * The component with the text of each post, in each language that has a
 * translation. English is required. List the same languages under
 * "languages" in post-catalog.ts.
 */
export const POST_CONTENT: Readonly<Record<Posts, PostTranslations>> = {
  [Posts.ASTRO_TO_ANGULAR]: {
    de: AstroToAngularDe,
    en: AstroToAngular,
    nl: AstroToAngularNl,
  },
  [Posts.CAPACITOR_CALENDAR]: {
    de: CapacitorCalendarPostDe,
    en: CapacitorCalendarPost,
    nl: CapacitorCalendarPostNl,
  },
  [Posts.VPS_HOSTING]: {
    de: VpsHostingDe,
    en: VpsHosting,
    nl: VpsHostingNl,
  },
};
