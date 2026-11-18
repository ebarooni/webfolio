import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  englishTranslation,
  germanTranslation,
} from '../../testing/localization-testing';
import { TranslationLoader } from './translation-loader';

describe('TranslationLoader', () => {
  let loader: TranslationLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loader = TestBed.inject(TranslationLoader);
  });

  it.each([
    { language: 'en', expected: englishTranslation },
    { language: 'de', expected: germanTranslation },
    { language: 'fr', expected: englishTranslation },
  ])(
    'should load the $language translation or fall back to English',
    async ({ language, expected }) => {
      const translation = await loader.getTranslation(language);

      expect(translation).toEqual(expected);
    },
  );
});
