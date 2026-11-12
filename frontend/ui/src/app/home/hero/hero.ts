import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import dayjs from 'dayjs';

import { Route } from '../../config/route';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { Portrait } from '../../shared/components/portrait/portrait';
import { nativeFontFamily } from './native-font';

const CAREER_START = '2021-01-01';

@Component({
  selector: 'app-home-hero',
  imports: [ArrowIcon, Portrait, RouterLink, TranslocoDirective],
  templateUrl: './hero.html',
})
export class HomeHero {
  readonly projectsLink = `/${Route.PROJECTS}`;
  readonly contactLink = `/${Route.CONTACT}`;
  readonly yearsOfExperience = dayjs().diff(dayjs(CAREER_START), 'year');
  readonly accentFontFamily = nativeFontFamily(navigator.userAgent);
}
