import { AppStore } from './app.store';
import { TestBed } from '@angular/core/testing';

describe('AppStore', () => {
  let service: AppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStore],
    });
    service = TestBed.inject(AppStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
