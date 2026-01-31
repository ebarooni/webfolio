import { Log } from './log';
import { TestBed } from '@angular/core/testing';

describe('LogService', () => {
  let service: Log;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Log],
    });
    
    service = TestBed.inject(Log);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
