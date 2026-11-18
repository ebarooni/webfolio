import { afterEach, describe, expect, it, vi } from 'vitest';

import { greetCuriousVisitors } from './console-greeting';

describe('greetCuriousVisitors', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should print a greeting with the link to the source', () => {
    const infoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined);

    greetCuriousVisitors();

    expect(infoSpy).toHaveBeenCalledOnce();
    expect(infoSpy.mock.calls[0].join(' ')).toContain('Hi, curious one.');
    expect(infoSpy.mock.calls[0]).toContain(
      'https://github.com/ebarooni/webfolio',
    );
  });
});
