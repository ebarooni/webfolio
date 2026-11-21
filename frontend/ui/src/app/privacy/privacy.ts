import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../config/route';
import { LocalizePathPipe } from '../localization/localize-path.pipe';
import { ArrowLink } from '../shared/components/arrow-link/arrow-link';
import { PageHeader } from '../shared/components/page-header/page-header';

/** The sections in reading order. Each one has a title and a body text. */
export const PRIVACY_SECTIONS = [
  'operator',
  'statistics',
  'contact',
  'hosting',
  'browser',
  'external',
  'rights',
] as const;

/**
 * The privacy note. Keep it in step with what the site really does,
 * for example the visit statistics (visit-statistics) and the contact
 * form. Change the "updated" date with each change of the text.
 */
@Component({
  selector: 'app-privacy',
  imports: [
    ArrowLink,
    LocalizePathPipe,
    PageHeader,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './privacy.html',
})
export class Privacy {
  readonly sections = PRIVACY_SECTIONS;
  readonly contactLink = `/${Route.CONTACT}`;
}
