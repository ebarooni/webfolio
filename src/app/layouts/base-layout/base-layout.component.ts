import { Component, Inject, input, Renderer2, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CompactNavbarComponent } from '../../components/compact-navbar/compact-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LetDirective } from '@ngrx/component';
import { AppStore } from '../../store/app/app.store';
import { DOCUMENT, NgClass } from '@angular/common';
import { Theme } from 'daisyui';
import { VERSION } from '../../../environments/build-info';

@Component({
  selector: 'app-base-layout',
  imports: [
    NavbarComponent,
    CompactNavbarComponent,
    FooterComponent,
    LetDirective,
    NgClass,
  ],
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {
  public readonly backgroundColorClass = input<string>('bg-base-100');
  public readonly offsetTop = input<boolean>(true);
  public readonly version = signal(`v${VERSION}`);

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
