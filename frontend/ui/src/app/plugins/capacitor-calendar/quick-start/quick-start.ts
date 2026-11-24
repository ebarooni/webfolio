import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BLOG_POSTS, Posts } from '../../../blog/post-catalog';
import { Route } from '../../../config/route';
import { LocalizePathPipe } from '../../../localization/localize-path.pipe';
import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { PLUGIN_LINKS, RESOURCES } from '../capacitor-calendar.content';
import { CodeTabs } from '../code/code-tabs/code-tabs';
import { INSTALL_TABS } from '../code/snippets';
import { injectCopy } from '../../../localization/localized-copy';
import { SectionHeading } from '../section-heading/section-heading';
import { QUICK_START_COPY } from './quick-start.copy';

const GUIDE_SLUG =
  BLOG_POSTS.find((post) => post.id === Posts.CAPACITOR_CALENDAR)?.slug ?? '';

function resourceLink(id: string): string {
  return (
    RESOURCES.find((resource) => resource.id === id)?.href ?? PLUGIN_LINKS.docs
  );
}

@Component({
  selector: 'app-capacitor-calendar-quick-start',
  imports: [ArrowIcon, CodeTabs, LocalizePathPipe, RouterLink, SectionHeading],
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
  /** The step-by-step blog post, so readers and crawlers find it here. */
  readonly guideLink = `/${Route.BLOG}/${GUIDE_SLUG}`;
}
