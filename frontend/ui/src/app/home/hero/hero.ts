import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { Button } from '../../shared/components/button/button';
import { Portrait } from '../../shared/components/portrait/portrait';
import { nativeFontFamily } from './native-font';

const CAREER_START_YEAR = 2021;

@Component({
  selector: 'app-home-hero',
  imports: [ArrowIcon, Button, Portrait, RouterLink, TranslocoDirective],
  templateUrl: './hero.html',
})
export class HomeHero {
  readonly projectsLink = `/${Route.PROJECTS}`;
  readonly contactLink = `/${Route.CONTACT}`;
  readonly yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;
  readonly accentFontFamily = nativeFontFamily(navigator.userAgent);
}
