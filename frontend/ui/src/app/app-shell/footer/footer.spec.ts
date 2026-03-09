import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { describe, beforeEach, expect, it } from 'vitest';

import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  let component: Footer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('bgClass', 'bg-base-200');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all social links', () => {
    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('nav ul li'),
    );
    expect(items.length).toBe(component.links().length);
  });

  it('renders correct href attributes for links', () => {
    const anchors: DebugElement[] = fixture.debugElement.queryAll(
      By.css('nav ul li a'),
    );

    anchors.forEach((anchorDe, index) => {
      const anchor = anchorDe.nativeElement as HTMLAnchorElement;
      expect(anchor.href).toContain(component.links()[index].href);
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toContain('noopener');
    });
  });

  it('applies background class', () => {
    const footerDe = fixture.debugElement.query(By.css('footer'));
    const footerEl = footerDe.nativeElement as HTMLElement;

    expect(footerEl.className).toContain('bg-base-200');
  });

  it('renders the current year in the copyright text', () => {
    const asideDe = fixture.debugElement.query(By.css('aside p'));
    const aside = asideDe.nativeElement as HTMLParagraphElement;

    expect(aside.textContent).toContain(component.currentYear.toString());
  });

  it('trackById returns the link id', () => {
    const link = component.links()[0];
    const result = component.trackById(0, link);

    expect(result).toBe(link.id);
  });
});
