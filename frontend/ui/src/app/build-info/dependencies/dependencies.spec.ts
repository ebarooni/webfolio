import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Dependencies } from './dependencies';

describe('Dependencies', () => {
  let fixture: ComponentFixture<Dependencies>;

  function rowTexts(): string[] {
    return fixture.debugElement
      .queryAll(By.css('tbody tr'))
      .map((row) =>
        (row.nativeElement as HTMLElement).textContent
          .replace(/\s+/g, ' ')
          .trim(),
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dependencies, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(Dependencies);
    fixture.componentRef.setInput('title', 'Runtime dependencies');
    fixture.componentRef.setInput('dependencies', {
      rxjs: '~7.8.2',
      '@angular/core': '^22.2.3',
    });
    fixture.detectChanges();
  });

  it('should show the title with the number of packages', () => {
    const caption = fixture.debugElement.query(By.css('caption'))
      .nativeElement as HTMLElement;

    expect(caption.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Runtime dependencies · 2',
    );
  });

  it('should list the packages by name with their versions', () => {
    expect(rowTexts()).toEqual(['@angular/core ^22.2.3', 'rxjs ~7.8.2']);
  });

  it('should name the columns for screen readers', () => {
    const headers = fixture.debugElement
      .queryAll(By.css('thead th'))
      .map((header) =>
        (header.nativeElement as HTMLElement).textContent.trim(),
      );

    expect(headers).toEqual(['Package', 'Version']);
  });
});
