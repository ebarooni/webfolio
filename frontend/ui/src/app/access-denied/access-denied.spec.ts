import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  it,
  expect,
  vi,
} from 'vitest';

import { AccessDenied } from './access-denied';
import { AppStore } from '../store/app/app.store';
import { Route } from '../config/route';

describe('AccessDenied', () => {
  let fixture: ComponentFixture<AccessDenied>;
  let component: AccessDenied;

  let geoAccess$: BehaviorSubject<boolean>;
  let updateHasGeoAccess: ReturnType<typeof vi.fn>;
  let navigateByUrl: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    geoAccess$ = new BehaviorSubject<boolean>(false);
    updateHasGeoAccess = vi.fn();
    navigateByUrl = vi.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessDenied],
      providers: [
        {
          provide: AppStore,
          useValue: {
            selectHasGeoAccess$: geoAccess$.asObservable(),
            updateHasGeoAccess,
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessDenied);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    geoAccess$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark password as invalid when shorter than six characters', () => {
    component.password.set('123');
    expect(component.isPasswordValid()).toBe(false);
  });

  it('should mark password as valid when at least six characters', () => {
    component.password.set('123456');
    expect(component.isPasswordValid()).toBe(true);
  });

  it('should update password from input event', () => {
    const event = {
      target: { value: 'secret123' },
    } as unknown as Event;

    component.updatePassword(event);

    expect(component.password()).toBe('secret123');
  });

  it('should call store when submitting valid password', () => {
    component.password.set('secret123');

    component.submit();

    expect(updateHasGeoAccess).toHaveBeenCalledWith('secret123');
  });

  it('should not call store when password is invalid', () => {
    component.password.set('123');

    component.submit();

    expect(updateHasGeoAccess).not.toHaveBeenCalled();
  });

  it('should navigate to home when geo access becomes true', () => {
    geoAccess$.next(true);
    fixture.detectChanges();

    expect(navigateByUrl).toHaveBeenCalledWith(Route.HOME);
  });
});
