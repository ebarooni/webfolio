import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AccessDenied } from './access-denied';
import { AppStore } from '../store/app/app.store';
import { Route } from '../config/constants/route';

describe('AccessDenied', () => {
  let fixture: ComponentFixture<AccessDenied>;
  let component: AccessDenied;

  const hasGeoAccess$ = new BehaviorSubject<boolean>(false);

  const routerMock = {
    navigateByUrl: vi.fn().mockResolvedValue(true),
  };

  const storeMock = {
    selectHasGeoAccess$: hasGeoAccess$.asObservable(),
    updateHasGeoAccess: vi.fn(),
  };

  beforeEach(async () => {
    hasGeoAccess$.next(false);
    routerMock.navigateByUrl.mockClear();
    storeMock.updateHasGeoAccess.mockClear();

    await TestBed.configureTestingModule({
      imports: [AccessDenied],
      providers: [
        { provide: AppStore, useValue: storeMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessDenied);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.contactForm.invalid).toBe(true);
  });

  it('submit should call store.updateHasGeoAccess with the password when valid', () => {
    component.contactForm.setValue({ password: '123456' });

    component.submit();

    expect(storeMock.updateHasGeoAccess).toHaveBeenCalledWith('123456');
  });

  it('should navigate to home when hasGeoAccess becomes true', async () => {
    hasGeoAccess$.next(true);
    fixture.detectChanges();

    await Promise.resolve();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(Route.HOME);
  });
});
