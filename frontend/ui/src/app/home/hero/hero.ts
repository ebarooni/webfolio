import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { Button } from '../../shared/components/button/button';
import { Portrait } from '../../shared/components/portrait/portrait';
import { nativeFontFamily } from './native-font';
import { LocalizePathPipe } from '../../localization/localize-path.pipe';

const CAREER_START_YEAR = 2021;

@Component({
  selector: 'app-home-hero',
  imports: [
    LocalizePathPipe,
    ArrowIcon,
    Button,
    Portrait,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './hero.html',
})
export class HomeHero {
  readonly projectsLink = `/${Route.PROJECTS}`;
  readonly contactLink = `/${Route.CONTACT}`;
  readonly yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;
  // The prerendered page does not know the device of the visitor.
  readonly accentFontFamily = nativeFontFamily(
    isPlatformBrowser(inject(PLATFORM_ID)) ? navigator.userAgent : '',
  );
}
