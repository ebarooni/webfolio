import { Component } from '@angular/core';

import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { PLUGIN_LINKS, RESOURCES } from '../capacitor-calendar.content';
import { CodeTabs } from '../code/code-tabs/code-tabs';
import { INSTALL_TABS } from '../code/snippets';
import { injectCopy } from '../../../localization/localized-copy';
import { SectionHeading } from '../section-heading/section-heading';
import { QUICK_START_COPY } from './quick-start.copy';

function resourceLink(id: string): string {
  return (
    RESOURCES.find((resource) => resource.id === id)?.href ?? PLUGIN_LINKS.docs
  );
}

@Component({
  selector: 'app-capacitor-calendar-quick-start',
  imports: [ArrowIcon, CodeTabs, SectionHeading],
  templateUrl: './quick-start.html',
  styleUrl: './quick-start.css',
})
export class CapacitorCalendarQuickStart {
  readonly copy = injectCopy(QUICK_START_COPY);
  readonly installTabs = INSTALL_TABS;
  readonly compatibilityLink = resourceLink('compatibility');
  readonly setupLink = resourceLink('setup');
  readonly examplesLink = resourceLink('examples');
  readonly docsLink = PLUGIN_LINKS.docs;
}
