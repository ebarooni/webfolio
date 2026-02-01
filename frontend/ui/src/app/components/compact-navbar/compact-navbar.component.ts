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
import { LeadingSlashPipe } from '../../pipes/leading-slash/leading-slash.pipe';
import { NgClass } from '@angular/common';
import { Theme } from '../../config/constants/themes-array';
import { ThemeSelectorModalComponent } from '../theme-selector-modal/theme-selector-modal.component';

@Component({
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    LeadingSlashPipe,
    ThemeSelectorModalComponent,
  ],
  selector: 'app-compact-navbar',
  styleUrls: ['./compact-navbar.component.css'],
  templateUrl: './compact-navbar.component.html',
})
export class CompactNavbarComponent extends BaseNavigationComponent {
  @ViewChild('navbarDiv')
  private readonly navbarDiv?: ElementRef<HTMLDivElement>;
  public readonly selectedTheme = input.required<Theme>();
  public readonly version = input<string | undefined>(undefined);
  public readonly themeChanged = output<Theme>();

  @HostListener('document:scroll') override onDocumentScroll() {
    super.onDocumentScroll(this.navbarDiv);
  }
}
