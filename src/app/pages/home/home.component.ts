import { Component, HostListener, signal } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { BaseRoutingComponent } from '../../extends/base-routing.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { ScrollIndicatorComponent } from '../../svg-components/scroll-indicator/scroll-indicator.component';
import { TimelineComponent } from './timeline/timeline.component';
import dayjs from 'dayjs';

@Component({
  imports: [
    BaseLayoutComponent,
    AboutComponent,
    InfoCardComponent,
    ScrollIndicatorComponent,
    TimelineComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends BaseRoutingComponent {
  // safari requires dd/mm/yyyy instead of dd-mm-yyyy
  readonly yearsOfExperience = dayjs().diff(dayjs('01-01-2021'.replace(/-/g, '/')), 'year');
  readonly window = signal(window);
  readonly showScrollIndicator = signal(this.isDocumentScrolling());

  @HostListener('document:scroll') onDocumentScroll() {
    this.showScrollIndicator.set(this.isDocumentScrolling());
  }

  private isDocumentScrolling() {
    return window.scrollY < 1;
  }
}
