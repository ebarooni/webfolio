import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { Footer } from './footer';

@Component({
  selector: 'app-github',
  template: '<svg data-testid="github-icon"></svg>',
})
class GithubStubComponent {}

@Component({
  selector: 'app-gitlab',
  template: '<svg data-testid="gitlab-icon"></svg>',
})
class GitlabStubComponent {}

@Component({
  selector: 'app-linkedin',
  template: '<svg data-testid="linkedin-icon"></svg>',
})
class LinkedinStubComponent {}

@Component({
  selector: 'app-stackoverflow',
  template: '<svg data-testid="stackoverflow-icon"></svg>',
})
class StackoverflowStubComponent {}

type SocialId = 'github' | 'gitlab' | 'stackoverflow' | 'linkedin' | 'xing';
type SocialLink = Readonly<{
  id: SocialId;
  label: string;
  href: string;
  icon: SocialId | null;
}>;

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  let component: Footer;

  const createComponent = async (options?: {
    bgClass?: string;
    links?: readonly SocialLink[];
  }) => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    })
      .overrideComponent(Footer, {
        set: {
          imports: [
            GithubStubComponent,
            GitlabStubComponent,
            LinkedinStubComponent,
            StackoverflowStubComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('bgClass', options?.bgClass ?? 'bg-base-200');

    if (options?.links) {
      fixture.componentRef.setInput('links', options.links);
    }

    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    await createComponent();
    expect(component).toBeTruthy();
  });

  it('should throw if required bgClass input is not provided', async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    const footerFixture = TestBed.createComponent(Footer);

    expect(() => footerFixture.detectChanges()).toThrow();
  });

  describe('background class binding', () => {
    it('should apply the provided bgClass to the <footer> element', async () => {
      await createComponent({ bgClass: 'bg-red-500' });

      const footerElement = fixture.debugElement.query(By.css('footer'))
        .nativeElement as HTMLElement;

      expect(footerElement.className).toContain('bg-red-500');
    });
  });

  describe('default social links', () => {
    it('should render a navigation landmark with correct aria-label', async () => {
      await createComponent();

      const nav = fixture.debugElement.query(
        By.css('nav[aria-label="Social links"]'),
      );
      expect(nav).toBeTruthy();
    });

    it('should render one tooltip and anchor per link with correct attributes', async () => {
      await createComponent();

      const tooltipElements = fixture.debugElement.queryAll(By.css('.tooltip'));
      const anchorElements = fixture.debugElement.queryAll(
        By.css('.tooltip a'),
      );

      expect(tooltipElements.length).toBe(component.links().length);
      expect(anchorElements.length).toBe(component.links().length);

      component.links().forEach((link, index) => {
        const tooltip = tooltipElements[index];
        const anchor = anchorElements[index].nativeElement as HTMLAnchorElement;

        expect(tooltip.attributes['data-tip']).toBe(link.label);

        expect(anchor.getAttribute('href')).toBe(link.href);
        expect(anchor.getAttribute('target')).toBe('_blank');
        expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
        expect(anchor.getAttribute('aria-label')).toBe(link.label);
        expect(anchor.getAttribute('title')).toBe(link.label);
      });
    });

    it('should render the correct icon component for each default link', async () => {
      await createComponent();

      expect(fixture.debugElement.query(By.css('app-github'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('app-gitlab'))).toBeTruthy();
      expect(
        fixture.debugElement.query(By.css('app-stackoverflow')),
      ).toBeTruthy();
      expect(fixture.debugElement.query(By.css('app-linkedin'))).toBeTruthy();
    });

    it('should render the copyright notice with the current year', async () => {
      await createComponent();

      const copyrightText =
        (
          fixture.debugElement.query(By.css('aside p'))
            .nativeElement as HTMLParagraphElement
        ).textContent ?? '';

      const currentYear = new Date().getFullYear();

      expect(copyrightText).toContain('© 2022–');
      expect(copyrightText).toContain(String(currentYear));
      expect(copyrightText).toContain('Ehsan Barooni');
      expect(copyrightText).toContain('All rights reserved');
    });
  });

  describe('custom links input', () => {
    it('should render fallback label when icon is null', async () => {
      const customLinks: readonly SocialLink[] = [
        {
          id: 'xing',
          label: 'XING',
          href: 'https://example.com/xing',
          icon: null,
        },
      ];

      await createComponent({ links: customLinks });

      const fallbackLabel = fixture.debugElement.query(
        By.css('span.text-label'),
      );
      expect(fallbackLabel).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect((fallbackLabel.nativeElement.textContent as string).trim()).toBe(
        'XING',
      );
    });

    it('should update rendered links when links input changes', async () => {
      await createComponent();

      const updatedLinks: readonly SocialLink[] = [
        {
          id: 'xing',
          label: 'XING',
          href: 'https://example.com/xing',
          icon: null,
        },
      ];

      fixture.componentRef.setInput('links', updatedLinks);
      fixture.detectChanges();

      const anchorElements = fixture.debugElement.queryAll(
        By.css('.tooltip a'),
      );
      expect(anchorElements.length).toBe(1);

      const anchor = anchorElements[0].nativeElement as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe('https://example.com/xing');
      expect(anchor.getAttribute('aria-label')).toBe('XING');
    });
  });

  describe('trackById', () => {
    it('should return the link id', async () => {
      await createComponent();

      const link: SocialLink = {
        id: 'github',
        label: 'GitHub',
        href: 'https://example.com',
        icon: 'github',
      };

      expect(component.trackById(0, link)).toBe('github');
    });
  });
});
