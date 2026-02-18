import { IS_DEV_MODE } from '../config/is-dev-mode';
import { Log } from './log';
import { TestBed } from '@angular/core/testing';

enum DevMode {
  FALSE,
  TRUE
}

describe('Log', () => {
  let service: Log;

  const setup = (isDevMode: DevMode) => {
    TestBed.configureTestingModule({
      providers: [
        Log,
        { provide: IS_DEV_MODE, useValue: DevMode.TRUE === isDevMode },
      ],
    });

    service = TestBed.inject(Log);
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    setup(DevMode.TRUE)
    expect(service).toBeTruthy();
  });

  describe('debug', () => {
    it('should do nothing when not in dev mode', () => {
      setup(DevMode.FALSE);

      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const err = new Error('boom');

      service.debug(err);

      expect(debugSpy).not.toHaveBeenCalled();
    });

    it('should log formatted output and the error when in dev mode', () => {
      setup(DevMode.TRUE);

      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const err = new Error('boom');

      service.debug(err);

      expect(debugSpy).toHaveBeenCalledTimes(1);

      const [message, passedError] = debugSpy.mock.calls[0] as unknown as [
        string,
        Error,
      ];

      expect(message).toBe('DEBUG: boom');
      expect(passedError).toBe(err);
    });

    it('should omit the colon when error message is empty', () => {
      setup(DevMode.TRUE);

      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const err = new Error('');

      service.debug(err);

      expect(debugSpy).toHaveBeenCalledTimes(1);

      const [message] = debugSpy.mock.calls[0] as unknown as [string];
      expect(message).toBe('DEBUG');
    });
  });

  describe('info', () => {
    it('should do nothing when not in dev mode', () => {
      setup(DevMode.FALSE);

      const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

      service.info('hello');

      expect(infoSpy).not.toHaveBeenCalled();
    });

    it('should log formatted output when in dev mode', () => {
      setup(DevMode.TRUE);

      const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

      service.info('hello');

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(infoSpy).toHaveBeenCalledWith('INFO: hello');
    });

    it('should omit the colon when description is empty', () => {
      setup(DevMode.TRUE);

      const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

      service.info('');

      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(infoSpy).toHaveBeenCalledWith('INFO');
    });
  });
});
