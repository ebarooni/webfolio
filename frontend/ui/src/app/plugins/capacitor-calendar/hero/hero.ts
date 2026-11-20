import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Route } from '../../../config/route';
import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { Button } from '../../../shared/components/button/button';
import { API_METHOD_COUNT } from '../api-methods';
import { BrandIcon } from '../brand-icon/brand-icon';
import {
  HERO_INSTALL_COMMAND,
  LIVE_BADGES,
  MONTHLY_DOWNLOADS_LABEL,
  PLUGIN_LINKS,
} from '../capacitor-calendar.content';
import { HeroVisual } from '../hero-visual/hero-visual';
import { InstallCommand } from '../install-command/install-command';

@Component({
  selector: 'app-capacitor-calendar-hero',
  imports: [
    ArrowIcon,
    BrandIcon,
    Button,
    HeroVisual,
    InstallCommand,
    RouterLink,
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class CapacitorCalendarHero {
  readonly links = PLUGIN_LINKS;
  readonly badges = LIVE_BADGES;
  readonly installCommand = HERO_INSTALL_COMMAND;
  readonly pageLink = `/${Route.PLUGINS_CAPACITOR_CALENDAR}`;
  readonly projectsLink = `/${Route.PROJECTS}`;

  readonly stats = [
    { value: MONTHLY_DOWNLOADS_LABEL, label: 'npm downloads a month' },
    { value: String(API_METHOD_COUNT), label: 'typed API methods' },
    { value: '3', label: 'platforms: iOS, Android, web' },
    { value: 'MIT', label: 'open source license' },
  ] as const;
}
