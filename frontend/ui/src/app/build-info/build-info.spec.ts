import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../environments/build-info', () => ({
  DEPENDENCIES: { angular: '21.0.0', rxjs: '7.8.0' },
  DEV_DEPENDENCIES: { vitest: '2.0.0' },
}));

import { BuildInfo } from './build-info';

@Component({ selector: 'app-hero', template: '<ng-content />' })
class HeroStub {}

@Component({ selector: 'app-deployment-details', template: '' })
class DeploymentDetailsStub {}

@Component({ selector: 'app-dependencies', template: '' })
class DependenciesStub {
  @Input() title?: string;
  @Input() dependencies!: Record<string, string>;
}

describe('BuildInfoComponent', () => {
  let fixture: ComponentFixture<BuildInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildInfo],
    })
      .overrideComponent(BuildInfo, {
        set: { imports: [HeroStub, DeploymentDetailsStub, DependenciesStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BuildInfo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders deployment details', () => {
    expect(
      fixture.debugElement.query(By.directive(DeploymentDetailsStub)),
    ).toBeTruthy();
  });

  it('passes runtime dependencies to the first dependencies block', () => {
    const blocks = fixture.debugElement.queryAll(By.directive(DependenciesStub));
    const runtime = blocks[0].componentInstance as DependenciesStub;

    expect(blocks.length).toBe(2);
    expect(runtime.dependencies).toEqual({ angular: '21.0.0', rxjs: '7.8.0' });
  });

  it('passes build time dependencies with a custom title', () => {
    const blocks = fixture.debugElement.queryAll(By.directive(DependenciesStub));
    const buildtime = blocks[1].componentInstance as DependenciesStub;

    expect(buildtime.title).toBe('Build time dependencies');
    expect(buildtime.dependencies).toEqual({ vitest: '2.0.0' });
  });
});
