import { signal, type WritableSignal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Language } from '../../config/languages';
import { SiteLanguage } from '../../localization/site-language';
import { AppStore } from '../../store/app/app.store';
import { LanguageSuggestion } from './language-suggestion';

describe('LanguageSuggestion', () => {
  let fixture: ComponentFixture<LanguageSuggestion>;
  let preferred: WritableSignal<Language>;
  let dismissed: WritableSignal<boolean>;

  const dismissLanguageSuggestion = vi.fn(() => {
    dismissed.set(true);
  });

  function card(): HTMLElement | null {
    return (
      (fixture.debugElement.query(By.css('aside'))?.nativeElement as
        HTMLElement | undefined) ?? null
    );
  }

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    preferred = signal<Language>('de');
    dismissed = signal(false);

    await TestBed.configureTestingModule({
      imports: [LanguageSuggestion, localizationTestingModule()],
      providers: [
        provideRouter([{ path: '**', children: [] }]),
        {
          provide: AppStore,
          useValue: {
            language: preferred,
            languageSuggestionDismissed: dismissed,
            dismissLanguageSuggestion,
          },
        },
      ],
    }).compileComponents();

    await TestBed.inject(Router).navigateByUrl('/projects');
    await TestBed.inject(SiteLanguage).activate('en');
    fixture = TestBed.createComponent(LanguageSuggestion);
    await settle();
  });

  it('offers the same page in the language that the visitor prefers', () => {
    const link = card()?.querySelector('a');

    expect(card()?.getAttribute('lang')).toBe('de');
    expect(card()?.textContent).toContain(
      'Diese Seite gibt es auch auf Deutsch.',
    );
    expect(link?.getAttribute('href')).toBe('/de/projects');
    expect(link?.getAttribute('hreflang')).toBe('de');
  });

  it('shows nothing when the page is in the preferred language', async () => {
    preferred.set('en');
    await settle();

    expect(card()).toBeNull();
  });

  it('shows nothing on a page that does not exist', async () => {
    fixture.componentRef.setInput('pageExists', false);
    await settle();

    expect(card()).toBeNull();
  });

  it('remembers that the visitor closed it', async () => {
    card()?.querySelector('button')?.click();
    await settle();

    expect(dismissLanguageSuggestion).toHaveBeenCalledOnce();
    expect(card()).toBeNull();
  });
});
