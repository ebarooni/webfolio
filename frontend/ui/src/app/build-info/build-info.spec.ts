import { By } from '@angular/platform-browser';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { DEPENDENCIES, DEV_DEPENDENCIES } from '../../environments/build-info';
import { BuildInfo } from './build-info';
import { Dependencies } from './dependencies/dependencies';
import { DeploymentDetails } from './deployment-details/deployment-details';
import { Hero } from '../shared/components/hero/hero';

@Component({
  selector: 'app-hero',
  template: `
    <section data-testid="hero">
      <ng-content select="[heroTitle]" />
      <ng-content select="[heroSubtitle]" />
    </section>
  `,
})
class MockHero {}

@Component({
  selector: 'app-dependencies',
  template: '',
})
class MockDependencies {
  readonly title = input('Runtime Dependencies');
  readonly dependencies = input.required<Record<string, string>>();
}

@Component({
  selector: 'app-deployment-details',
  template: '',
})
class MockDeploymentDetails {}

describe('BuildInfo', () => {
  let fixture: ComponentFixture<BuildInfo>;
  let component: BuildInfo;

  beforeAll(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildInfo],
    })
      .overrideComponent(BuildInfo, {
        remove: {
          imports: [Hero, DeploymentDetails, Dependencies],
        },
        add: {
          imports: [MockHero, MockDeploymentDetails, MockDependencies],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BuildInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('exposes the runtime and build time dependencies as signals', () => {
    expect(component.dependencies()).toBe(DEPENDENCIES);
    expect(component.devDependencies()).toBe(DEV_DEPENDENCIES);
  });

  it('renders the page heading and subtitle inside the hero component', () => {
    const heroDebugElement = fixture.debugElement.query(
      By.css('[data-testid="hero"]'),
    );
    const heroElement = heroDebugElement.nativeElement as HTMLElement;
    const textContent = heroElement.textContent ?? '';

    expect(textContent).toContain('Build Information');
    expect(textContent).toContain(
      'Explore the current version, deployment details, and technical dependencies powering this website.',
    );
  });

  it('renders deployment details and both dependency sections with the expected inputs', () => {
    const deploymentDetailsDebugElement = fixture.debugElement.query(
      By.directive(MockDeploymentDetails),
    );
    const dependenciesDebugElements = fixture.debugElement.queryAll(
      By.directive(MockDependencies),
    );

    expect(deploymentDetailsDebugElement).toBeTruthy();
    expect(dependenciesDebugElements).toHaveLength(2);

    const runtimeDependenciesComponent = dependenciesDebugElements[0]
      .componentInstance as MockDependencies;
    const buildTimeDependenciesComponent = dependenciesDebugElements[1]
      .componentInstance as MockDependencies;

    expect(runtimeDependenciesComponent.title()).toBe('Runtime Dependencies');
    expect(runtimeDependenciesComponent.dependencies()).toBe(DEPENDENCIES);
    expect(buildTimeDependenciesComponent.title()).toBe(
      'Build Time Dependencies',
    );
    expect(buildTimeDependenciesComponent.dependencies()).toBe(
      DEV_DEPENDENCIES,
    );
  });
});
