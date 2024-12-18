import {
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BaseNavigationComponent } from '../../extends/base-navigation.component';
import { Theme } from 'daisyui';
import { LogService } from '../../services/log/log.service';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LeadingSlashPipe } from '../../pipes/leading-slash/leading-slash.pipe';

@Component({
  selector: 'app-compact-navbar',
  templateUrl: './compact-navbar.component.html',
  styleUrls: ['./compact-navbar.component.scss'],
  imports: [NgClass, RouterLink, RouterLinkActive, LeadingSlashPipe],
})
export class CompactNavbarComponent extends BaseNavigationComponent {
  @ViewChild('navbarDiv')
  private readonly navbarDiv?: ElementRef<HTMLDivElement>;
  public readonly selectedTheme = input.required<Theme>();
  public readonly version = input<string | undefined>(undefined);
  public readonly themeChanged = output<Theme>();

  constructor(renderer: Renderer2, logService: LogService) {
    super(renderer, logService);
  }

  @HostListener('document:scroll') override onDocumentScroll() {
    super.onDocumentScroll(this.navbarDiv);
  }
}
