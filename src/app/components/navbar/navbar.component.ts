import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  input,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BaseNavigationComponent } from '../../extends/base-navigation.component';
import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';
import { LeadingSlashPipe } from '../../pipes/leading-slash/leading-slash.pipe';
import { NgClass } from '@angular/common';
import { Theme } from 'daisyui';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    DataThemeDirective,
    NgClass,
    LeadingSlashPipe,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends BaseNavigationComponent {
  @ViewChild('navbarDiv')
  private readonly navbarDiv?: ElementRef<HTMLDivElement>;
  public readonly selectedTheme = input.required<Theme>();
  public readonly version = input<string | undefined>(undefined);
  public readonly themeChanged = output<Theme>();

  @HostListener('document:scroll') override onDocumentScroll() {
    super.onDocumentScroll(this.navbarDiv);
  }
}
