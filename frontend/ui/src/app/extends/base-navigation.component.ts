import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Theme, themesArray } from '../constants/themes-array';
import { Log } from '../log/log';
import { Route } from '../constants/route';

@Component({
  selector: 'app-base-navigation',
  template: '',
})
export class BaseNavigationComponent {
  constructor(
    private readonly renderer: Renderer2,
    private readonly log: Log,
  ) {}

  get themes(): Theme[] {
    return themesArray;
  }

  get Route(): typeof Route {
    return Route;
  }

  onDocumentScroll(navbarDiv: ElementRef<HTMLDivElement> | undefined) {
    try {
      if (!navbarDiv?.nativeElement) {
        const error = new Error('Document not available');
        this.log.debug(error);
        return;
      }
      const shadowXs = 'shadow-xs';

      if (window.scrollY) {
        this.renderer.addClass(navbarDiv.nativeElement, shadowXs);
      } else {
        this.renderer.removeClass(navbarDiv.nativeElement, shadowXs);
      }
    } catch (error) {
      this.log.debug(error as Error);
    }
  }
}
