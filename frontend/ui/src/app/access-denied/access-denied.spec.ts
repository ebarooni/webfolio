import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  let hasGeoAccess$: BehaviorSubject<boolean>;

  let store: {
    selectHasGeoAccess$: BehaviorSubject<boolean>;
    updateHasGeoAccess: ReturnType<typeof vi.fn>;
  };

  let router: {
    navigateByUrl: ReturnType<typeof vi.fn>;
  };

  beforeAll(() => {
    hasGeoAccess$ = new BehaviorSubject(false);

    store = {
      selectHasGeoAccess$: hasGeoAccess$,
      updateHasGeoAccess: vi.fn(),
    };

    router = {
      navigateByUrl: vi.fn(),
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessDenied],
      providers: [
        { provide: AppStore, useValue: store },
        { provide: Router, useValue: router },
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
    hasGeoAccess$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the access denied title', () => {
    const titleDebugElement = fixture.debugElement.query(
      By.css('#access-denied-title'),
    );
    const titleElement = titleDebugElement.nativeElement as HTMLElement;

    expect(titleElement.textContent).toContain('Access Denied');
  });

  it('disables submit button when password is invalid', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));
    const buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;

    expect(buttonElement.disabled).toBe(true);
  });

  it('enables submit button when password becomes valid', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    const buttonDebugElement = fixture.debugElement.query(By.css('button'));
    const buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;

    inputElement.value = '123456';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(buttonElement.disabled).toBe(false);
  });

  it('updates password signal on input', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    inputElement.value = 'abcdef';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.password()).toBe('abcdef');
  });

  it('calls store.updateHasGeoAccess when submitting a valid password', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement;

    const formDebugElement = fixture.debugElement.query(By.css('form'));
    const formElement = formDebugElement.nativeElement as HTMLFormElement;

    inputElement.value = '123456';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    formElement.dispatchEvent(new Event('submit'));

    expect(store.updateHasGeoAccess).toHaveBeenCalledWith('123456');
  });

  it('does not call store.updateHasGeoAccess when password is invalid', () => {
    const formDebugElement = fixture.debugElement.query(By.css('form'));
    const formElement = formDebugElement.nativeElement as HTMLFormElement;

    formElement.dispatchEvent(new Event('submit'));

    expect(store.updateHasGeoAccess).not.toHaveBeenCalled();
  });

  it('navigates to home when geo access becomes true', () => {
    hasGeoAccess$.next(true);

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(Route.HOME);
  });
});
