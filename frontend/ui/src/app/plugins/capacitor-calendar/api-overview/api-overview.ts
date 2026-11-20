import { Component, computed, signal } from '@angular/core';

import {
  API_GROUPS,
  API_METHOD_COUNT,
  type ApiMethod,
  type Platform,
} from '../api-methods';
import {
  methodReferenceUrl,
  PLUGIN_LINKS,
} from '../capacitor-calendar.content';
import { SectionHeading } from '../section-heading/section-heading';

type PlatformFilter = Platform | 'All';

const FILTERS: readonly PlatformFilter[] = ['All', 'iOS', 'Android', 'Web'];

@Component({
  selector: 'app-capacitor-calendar-api-overview',
  imports: [SectionHeading],
  templateUrl: './api-overview.html',
  styleUrl: './api-overview.css',
})
export class CapacitorCalendarApiOverview {
  readonly groups = API_GROUPS;
  readonly filters = FILTERS;
  readonly referenceUrl = PLUGIN_LINKS.apiReference;
  readonly lead = `${API_METHOD_COUNT} methods in four groups. Pick a platform to see what it supports. Each method links to its reference with all options.`;

  readonly filter = signal<PlatformFilter>('All');

  readonly matchCount = computed(() => {
    const filter = this.filter();

    return API_GROUPS.flatMap((group) => group.methods).filter((method) =>
      this.matchesFilter(method, filter),
    ).length;
  });

  isAvailable(method: ApiMethod): boolean {
    return this.matchesFilter(method, this.filter());
  }

  methodUrl(method: ApiMethod): string {
    return methodReferenceUrl(method.name);
  }

  private matchesFilter(method: ApiMethod, filter: PlatformFilter): boolean {
    return filter === 'All' || method.platforms.includes(filter);
  }
}
