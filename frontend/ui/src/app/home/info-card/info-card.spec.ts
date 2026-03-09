import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InfoCard } from './info-card';

@Component({
  standalone: true,
  imports: [InfoCard],
  template: `
    <app-info-card>
      <span header>Header</span>
      <span description>Description</span>
    </app-info-card>
  `,
})
class TestHostComponent {}

describe('InfoCard', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders projected header content', () => {
    const headerDebug = fixture.debugElement.query(By.css('h2'));
    const header = headerDebug.nativeElement as HTMLHeadingElement;

    expect(header.textContent?.trim()).toBe('Header');
  });

  it('renders projected description content', () => {
    const descriptionDebug = fixture.debugElement.query(By.css('p'));
    const description = descriptionDebug.nativeElement as HTMLParagraphElement;

    expect(description.textContent?.trim()).toBe('Description');
  });
});
