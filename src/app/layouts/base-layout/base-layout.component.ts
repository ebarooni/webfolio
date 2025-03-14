import { Component, Inject, Renderer2, input, signal } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { AppStore } from '../../store/app/app.store';
import { CompactNavbarComponent } from '../../components/compact-navbar/compact-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LetDirective } from '@ngrx/component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Theme } from 'daisyui';
import { VERSION } from '../../../environments/build-info';

@Component({
  imports: [
    NavbarComponent,
    CompactNavbarComponent,
    FooterComponent,
    LetDirective,
    NgClass,
  ],
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {
  public readonly backgroundColorClass = input<string>('bg-base-100');
  public readonly offsetTop = input<boolean>(true);
  public readonly version = signal(`v${VERSION}`);
  public readonly footerColorClass = input<string>(
    'bg-gradient-to-b from-base-200 to-base-100',
  );

  constructor(
    readonly appStore: AppStore,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  public themeChanged(theme: Theme): void {
    this.appStore.updateTheme(theme);
    this.renderer.setAttribute(
      this.document.documentElement,
      'data-theme',
      theme,
    );
  }
}
