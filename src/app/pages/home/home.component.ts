import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { ContainerComponent } from '../../components/container/container.component';
import { HeroComponent } from './hero/hero.component';
import { ServicesComponent } from './services/services.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { RouterLink } from '@angular/router';
import { BaseRoutingComponent } from '../../extends/base-routing.component';

@Component({
  selector: 'app-home',
  imports: [
    BaseLayoutComponent,
    ContainerComponent,
    HeroComponent,
    ServicesComponent,
    HighlightsComponent,
    CallToActionComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent extends BaseRoutingComponent {}
