import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';

@Component({
  standalone: true,
  imports: [Hero],
  template: `
    <app-hero>
      <span heroTitle>{{ title }}</span>
      <span heroSubtitle>{{ subtitle }}</span>
    </app-hero>
  `,
})
class TestHostComponent {
  public title = 'Build better products';
  public subtitle = 'Ship reliable software with confidence.';
}

describe('Hero', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let componentFixture: ComponentFixture<Hero>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [Hero, TestHostComponent],
    });
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    componentFixture = TestBed.createComponent(Hero);

    hostFixture.detectChanges();
    componentFixture.detectChanges();
  });

  afterEach(() => {
    hostFixture.destroy();
    componentFixture.destroy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('renders the projected title and subtitle content', () => {
    const titleDebugElement = hostFixture.debugElement.query(By.css('h1'));
    const subtitleDebugElement = hostFixture.debugElement.query(By.css('p'));

    const titleElement = titleDebugElement.nativeElement as HTMLHeadingElement;
    const subtitleElement =
      subtitleDebugElement.nativeElement as HTMLParagraphElement;

    expect(titleElement.textContent?.trim()).toBe('Build better products');
    expect(subtitleElement.textContent?.trim()).toBe(
      'Ship reliable software with confidence.',
    );
  });

  it('applies the default subtitle class', () => {
    const subtitleDebugElement = componentFixture.debugElement.query(
      By.css('p'),
    );
    const subtitleElement =
      subtitleDebugElement.nativeElement as HTMLParagraphElement;

    expect(subtitleElement.classList.contains('text-body')).toBe(true);
    expect(subtitleElement.classList.contains('max-w-2xl')).toBe(true);
    expect(subtitleElement.classList.contains('text-neutral-content')).toBe(
      true,
    );
  });

  it.each([
    {
      property: 'backgroundClass',
      selector: 'section',
      expectedClass: 'bg-base-200',
    },
    {
      property: 'titleClass',
      selector: 'h1',
      expectedClass: 'text-primary',
    },
    {
      property: 'subtitleClass',
      selector: 'p',
      expectedClass: 'text-secondary',
    },
  ] as const)(
    'applies the bound $property class',
    async ({ property, selector, expectedClass }) => {
      componentFixture.componentRef.setInput(property, expectedClass);
      await componentFixture.whenStable();
      componentFixture.detectChanges();

      const elementDebugElement = componentFixture.debugElement.query(
        By.css(selector),
      );
      const element = elementDebugElement.nativeElement as HTMLElement;

      expect(element.classList.contains(expectedClass)).toBe(true);
    },
  );
});
