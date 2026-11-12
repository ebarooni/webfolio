import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Focus } from './focus';

describe('Focus', () => {
  let fixture: ComponentFixture<Focus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Focus, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(Focus);
    fixture.detectChanges();
  });

  it('should render every translated entry', () => {
    const titles = fixture.debugElement
      .queryAll(By.css('h3'))
      .map((title) => (title.nativeElement as HTMLElement).textContent.trim());

    expect(titles).toEqual([
      'Enterprise frontends',
      'Hybrid apps and native plugins',
      'Full stack delivery',
    ]);
  });
});
