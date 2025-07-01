import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Theme, themesArray } from '../constants/themes-array';
import { LogService } from '../services/log/log.service';
import { Route } from '../constants/route';

@Component({
  selector: 'app-base-navigation',
  template: '',
})
export class BaseNavigationComponent {
  constructor(
    private readonly renderer: Renderer2,
    private readonly logService: LogService,
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
        this.logService.log(error, error.message);
        return;
      }
      const shadow = 'shadow-sm';

      if (window.scrollY) {
        this.renderer.addClass(navbarDiv.nativeElement, shadow);
      } else {
        this.renderer.removeClass(navbarDiv.nativeElement, shadow);
      }
    } catch (error) {
      this.logService.log(error, 'Failed to change navbar shadow');
    }
  }
}
