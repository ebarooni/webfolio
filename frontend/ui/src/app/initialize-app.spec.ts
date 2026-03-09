import { TestBed } from '@angular/core/testing';
import { AppStore, IState } from './store/app/app.store';
import { initializeApp } from './initialize-app';

describe('initializeApp', () => {
  let appStore: Pick<AppStore, 'initialize'>;
  let originalTheme: string | null;

  beforeAll(() => {
    originalTheme = document.documentElement.getAttribute('data-theme');
  });

  beforeEach(() => {
    appStore = {
      initialize: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AppStore, useValue: appStore }],
    });

    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  afterAll(() => {
    if (originalTheme === null) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', originalTheme);
    }
  });

  it('sets the document theme from the app store initialization result', () => {
    vi.mocked(appStore.initialize).mockReturnValue({ theme: 'dark' } as IState);

    TestBed.runInInjectionContext(() => {
      initializeApp();
    });

    expect(appStore.initialize).toHaveBeenCalledTimes(1);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('logs the error when app store initialization throws', () => {
    const error = new Error('Initialization failed');
    const debugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);
    vi.mocked(appStore.initialize).mockImplementation(() => {
      throw error;
    });

    expect(() => {
      TestBed.runInInjectionContext(() => {
        initializeApp();
      });
    }).not.toThrow();

    expect(appStore.initialize).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledWith(error);
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
