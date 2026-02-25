import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';
import { BuildInfo } from './build-info';

@Component({
  selector: 'app-hero',
  template: '<ng-content />',
})
class HeroStub {
  @Input() backgroundColor?: string;
  @Input() titleColor?: string;
  @Input() subtitleColor?: string;
}

@Component({ selector: 'app-deployment-details', template: '' })
class DeploymentDetailsStub {}

@Component({ selector: 'app-dependencies', template: '' })
class DependenciesStub {
  @Input() title?: string;
  @Input() dependencies!: Record<string, string>;
}

describe('BuildInfo', () => {
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

  it('passes build time dependencies with a custom title', () => {
    const blocks = fixture.debugElement.queryAll(By.directive(DependenciesStub));
    const buildtime = blocks[1].componentInstance as DependenciesStub;

    expect(buildtime.title).toBe('Build Time Dependencies');
  });
});
