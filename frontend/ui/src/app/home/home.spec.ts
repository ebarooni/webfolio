import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { AppStore } from '../store/app/app.store';
import { Home } from './home';

describe('Home', () => {
  it('should render the sections in reading order', async () => {
    await TestBed.configureTestingModule({
      imports: [Home, localizationTestingModule()],
      providers: [
        provideRouter([]),
        { provide: AppStore, useValue: { selectTheme$: of('light') } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const sections = fixture.debugElement.children.map(
      (section) => (section.nativeElement as HTMLElement).localName,
    );

    expect(sections).toEqual([
      'app-home-hero',
      'app-selected-work',
      'app-focus',
      'app-experience',
      'app-latest-posts',
      'app-contact-panel',
    ]);
  });
});
