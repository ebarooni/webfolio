import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { BUILD_INFO } from '../../environments/build-info';
import { localizationTestingModule } from '../../testing/localization-testing';
import { BuildInfo } from './build-info';

describe('BuildInfo', () => {
  let fixture: ComponentFixture<BuildInfo>;

  function captions(): string[] {
    return fixture.debugElement
      .queryAll(By.css('caption'))
      .map((caption) =>
        (caption.nativeElement as HTMLElement).textContent
          .replace(/\s+/g, ' ')
          .trim(),
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildInfo, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildInfo);
    fixture.detectChanges();
  });

  it('should show the headline of the screen', () => {
    const headline = fixture.debugElement.query(By.css('h1'))
      .nativeElement as HTMLElement;

    expect(headline.textContent.trim()).toBe('What runs this website.');
  });

  it('should show the facts of the build', () => {
    expect(
      fixture.debugElement.query(By.css('app-build-facts dl')),
    ).not.toBeNull();
  });

  it('should list the runtime and the build time packages', () => {
    const runtimeCount = Object.keys(BUILD_INFO.dependencies).length;
    const buildTimeCount = Object.keys(BUILD_INFO.devDependencies).length;

    expect(captions()).toEqual([
      `Runtime dependencies · ${runtimeCount}`,
      `Build time dependencies · ${buildTimeCount}`,
    ]);
  });
});
