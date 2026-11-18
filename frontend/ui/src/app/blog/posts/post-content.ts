import { Type } from '@angular/core';

import { Language } from '../../config/languages';
import { Posts } from '../post-catalog';
import { AstroToAngular } from './astro-to-angular/astro-to-angular';
import { AstroToAngularDe } from './astro-to-angular/astro-to-angular-de';
import { AstroToAngularNl } from './astro-to-angular/astro-to-angular-nl';
import { VpsHosting } from './vps-hosting/vps-hosting';
import { VpsHostingDe } from './vps-hosting/vps-hosting-de';
import { VpsHostingNl } from './vps-hosting/vps-hosting-nl';

/** The component with the text of each post, in each language. */
export const POST_CONTENT: Readonly<
  Record<Posts, Readonly<Record<Language, Type<unknown>>>>
> = {
  [Posts.ASTRO_TO_ANGULAR]: {
    de: AstroToAngularDe,
    en: AstroToAngular,
    nl: AstroToAngularNl,
  },
  [Posts.VPS_HOSTING]: {
    de: VpsHostingDe,
    en: VpsHosting,
    nl: VpsHostingNl,
  },
};
