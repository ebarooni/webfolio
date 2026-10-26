import { describe, expect, it } from 'vitest';

import { fixedHeaderScrollOffset } from './fixed-header-scroll-offset';

describe('fixedHeaderScrollOffset', () => {
  it('clears the fixed header', () => {
    const documentRef = document.implementation.createHTMLDocument('offset');
    const header = documentRef.createElement('header');

    Object.defineProperty(header, 'offsetHeight', { value: 80 });
    documentRef.body.append(header);

    expect(fixedHeaderScrollOffset(documentRef)).toEqual([0, 80]);
  });

  it('is zero when the page has no header', () => {
    const documentRef = document.implementation.createHTMLDocument('offset');

    expect(fixedHeaderScrollOffset(documentRef)).toEqual([0, 0]);
  });
});
