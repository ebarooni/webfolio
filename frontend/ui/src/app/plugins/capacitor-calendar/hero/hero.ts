import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Route } from '../../../config/route';
import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { Button } from '../../../shared/components/button/button';
import { BrandIcon } from '../brand-icon/brand-icon';
import {
  HERO_INSTALL_COMMAND,
  LIVE_BADGES,
  PLUGIN_LINKS,
} from '../capacitor-calendar.content';
import { HeroVisual } from '../hero-visual/hero-visual';
import { InstallCommand } from '../install-command/install-command';
import { LocalizePathPipe } from '../../../localization/localize-path.pipe';

@Component({
  selector: 'app-capacitor-calendar-hero',
  imports: [
    LocalizePathPipe,
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
}
