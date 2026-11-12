import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import { ContactPanel } from './contact-panel';

describe('ContactPanel', () => {
  it('should invite the visitor to the contact screen', async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPanel, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactPanel);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a'))
      .nativeElement as HTMLAnchorElement;

    expect(link.getAttribute('href')).toBe(`/${Route.CONTACT}`);
    expect(link.textContent.trim()).toBe('Write to me');
  });
});
