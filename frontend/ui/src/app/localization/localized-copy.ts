import { computed, inject, Signal } from '@angular/core';

import { Language } from '../config/languages';
import { SiteLanguage } from './site-language';

/**
 * The shape of a text object without its literal types. The German and
 * Dutch texts must have the same keys as the English one, but other words.
 */
export type CopyShape<T> = T extends string
  ? string
  : T extends boolean
    ? boolean
    : T extends number
      ? number
      : T extends readonly (infer Item)[]
        ? readonly CopyShape<Item>[]
        : { readonly [Key in keyof T]: CopyShape<T[Key]> };

/** The texts of one component in every site language. */
export type LocalizedCopy<T> = Readonly<Record<Language, T>>;

/**
 * Gives the texts in the language of the page as a signal. Call it in an
 * injection context, for example in a field initializer of a component.
 */
export function injectCopy<T>(copy: LocalizedCopy<T>): Signal<T> {
  const siteLanguage = inject(SiteLanguage);

  return computed(() => copy[siteLanguage.current()]);
}
