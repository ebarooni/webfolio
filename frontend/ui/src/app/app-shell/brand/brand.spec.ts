import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Brand } from './brand';

describe('Brand', () => {
  let fixture: ComponentFixture<Brand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Brand, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Brand);
    fixture.detectChanges();
  });

  it('should link to the home screen with a translated label', () => {
    const link = fixture.debugElement.query(By.css('a'))
      .nativeElement as HTMLAnchorElement;

    expect(link.getAttribute('href')).toBe('/');
    expect(link.getAttribute('aria-label')).toBe(
      'Ehsan Barooni, go to the home screen',
    );
  });

  it('should render the monogram with the portrait on its back', () => {
    const monogram = fixture.debugElement.query(By.css('.monogram'))
      .nativeElement as HTMLElement;

    expect(monogram.textContent).toContain('EB');
    expect(
      fixture.debugElement.query(By.css('app-portrait.monogram-back')),
    ).toBeTruthy();
  });
});
