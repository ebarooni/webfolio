import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-contact-panel',
  imports: [ArrowIcon, Button, RouterLink, TranslocoDirective],
  templateUrl: './contact-panel.html',
})
export class ContactPanel {
  readonly contactLink = `/${Route.CONTACT}`;
}
