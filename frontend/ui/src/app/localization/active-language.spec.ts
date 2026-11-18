import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { injectActiveLanguage } from './active-language';

describe('injectActiveLanguage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [localizationTestingModule()],
    });
  });

  it('starts with the active language and follows a change', () => {
    const language = runInInjectionContext(TestBed.inject(Injector), () =>
      injectActiveLanguage(),
    );

    expect(language()).toBe('en');

    TestBed.inject(TranslocoService).setActiveLang('de');

    expect(language()).toBe('de');
  });
});
