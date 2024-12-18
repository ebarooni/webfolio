import {
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BaseNavigationComponent } from '../../extends/base-navigation.component';
import { Theme } from 'daisyui';
import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';
import { NgClass } from '@angular/common';
import { LogService } from '../../services/log/log.service';
import { LeadingSlashPipe } from '../../pipes/leading-slash/leading-slash.pipe';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    DataThemeDirective,
    NgClass,
    LeadingSlashPipe,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends BaseNavigationComponent {
  @ViewChild('navbarDiv')
  private readonly navbarDiv?: ElementRef<HTMLDivElement>;
  public readonly selectedTheme = input.required<Theme>({ alias: 'theme' });
  public readonly version = input<string | undefined>(undefined);
  public readonly themeChanged = output<Theme>();

  constructor(renderer: Renderer2, logService: LogService) {
    super(renderer, logService);
  }

  @HostListener('document:scroll') override onDocumentScroll() {
    super.onDocumentScroll(this.navbarDiv);
  }
}
