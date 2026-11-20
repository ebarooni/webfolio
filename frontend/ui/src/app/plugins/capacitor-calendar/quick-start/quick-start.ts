import { Component } from '@angular/core';

import { COMPATIBILITY } from '../capacitor-calendar.content';
import { CodeTabs } from '../code/code-tabs/code-tabs';
import {
  INSTALL_TABS,
  PERMISSION_TABS,
  QUICK_START_TABS,
} from '../code/snippets';
import { SectionHeading } from '../section-heading/section-heading';

@Component({
  selector: 'app-capacitor-calendar-quick-start',
  imports: [CodeTabs, SectionHeading],
  templateUrl: './quick-start.html',
  styleUrl: './quick-start.css',
})
export class CapacitorCalendarQuickStart {
  readonly installTabs = INSTALL_TABS;
  readonly permissionTabs = PERMISSION_TABS;
  readonly quickStartTabs = QUICK_START_TABS;
  readonly olderCapacitor = COMPATIBILITY[1];
}
