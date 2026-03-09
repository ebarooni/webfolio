import { By } from '@angular/platform-browser';
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

import { DeploymentDetails } from './deployment-details';

describe('DeploymentDetails', () => {
  let fixture: ComponentFixture<DeploymentDetails>;
  let component: DeploymentDetails;

  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(async () => {
    vi.setSystemTime(new Date('2026-03-08T15:00:00.000Z'));

    await TestBed.configureTestingModule({
      imports: [DeploymentDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(DeploymentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the deployment details heading', () => {
    const headingDebugElement = fixture.debugElement.query(By.css('h3'));
    const headingElement =
      headingDebugElement.nativeElement as HTMLHeadingElement;

    expect(headingElement.textContent?.trim()).toBe('Deployment Details');
  });

  it('renders the expected detail labels', () => {
    const labelDebugElements = fixture.debugElement.queryAll(By.css('dt'));

    expect(labelDebugElements).toHaveLength(2);

    const labels = labelDebugElements.map((labelDebugElement) => {
      const labelElement = labelDebugElement.nativeElement as HTMLElement;
      return labelElement.textContent?.trim();
    });

    expect(labels).toEqual(['Version', 'Last Deployment']);
  });

  it('renders the current version from the component signal', () => {
    const valueDebugElements = fixture.debugElement.queryAll(By.css('dd'));
    const versionElement = valueDebugElements[0].nativeElement as HTMLElement;

    expect(versionElement.textContent?.trim()).toBe(component.version());
    expect(component.version()).toBeTruthy();
  });

  it('renders the last deployment text from the component signal', () => {
    const valueDebugElements = fixture.debugElement.queryAll(By.css('dd'));
    const lastDeploymentElement = valueDebugElements[1]
      .nativeElement as HTMLElement;

    expect(lastDeploymentElement.textContent?.trim()).toBe(
      component.sinceLastBuild(),
    );
    expect(component.sinceLastBuild()).toBeTruthy();
  });

  it('renders two detail values', () => {
    const valueDebugElements = fixture.debugElement.queryAll(By.css('dd'));

    expect(valueDebugElements).toHaveLength(2);
  });
});
