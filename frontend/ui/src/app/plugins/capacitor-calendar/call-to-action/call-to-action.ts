import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Route } from '../../../config/route';
import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { BrandIcon } from '../brand-icon/brand-icon';
import {
  HERO_INSTALL_COMMAND,
  PLUGIN_LINKS,
} from '../capacitor-calendar.content';
import { InstallCommand } from '../install-command/install-command';

@Component({
  selector: 'app-capacitor-calendar-call-to-action',
  imports: [ArrowIcon, BrandIcon, InstallCommand, RouterLink],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.css',
})
export class CapacitorCalendarCallToAction {
  readonly links = PLUGIN_LINKS;
  readonly installCommand = HERO_INSTALL_COMMAND;
  readonly contactLink = `/${Route.CONTACT}`;
}
