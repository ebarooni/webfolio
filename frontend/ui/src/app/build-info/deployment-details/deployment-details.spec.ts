import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../environments/build-info', () => ({
  VERSION: 'vTest',
  BUILD_TIME: '2026-02-25T10:00:00Z',
}));

import { DeploymentDetails } from './deployment-details';

describe('DeploymentDetails', () => {
  let fixture: ComponentFixture<DeploymentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(DeploymentDetails);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the version', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('vTest');
  });

  it('renders time since last build (hours)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-25T13:00:00Z'));

    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('3 hours ago');
  });
});
