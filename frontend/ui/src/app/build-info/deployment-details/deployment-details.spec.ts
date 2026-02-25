import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
});
