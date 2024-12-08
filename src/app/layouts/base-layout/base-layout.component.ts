import { Component, Inject, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CompactNavbarComponent } from '../../components/compact-navbar/compact-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LetDirective } from '@ngrx/component';
import { AppStore } from '../../store/app/app.store';
import { DOCUMENT } from '@angular/common';
import { Theme } from 'daisyui';

@Component({
  selector: 'app-base-layout',
  imports: [
    NavbarComponent,
    CompactNavbarComponent,
    FooterComponent,
    LetDirective,
  ],
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {
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
