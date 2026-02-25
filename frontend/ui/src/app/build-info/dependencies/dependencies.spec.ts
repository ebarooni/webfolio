import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Dependencies } from './dependencies';

describe('DependenciesComponent', () => {
  let fixture: ComponentFixture<Dependencies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dependencies],
    }).compileComponents();

    fixture = TestBed.createComponent(Dependencies);
  });

  it('should create', () => {
    fixture.componentRef.setInput('dependencies', {});
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('uses the default title when none provided', () => {
    fixture.componentRef.setInput('dependencies', { angular: '21.0.0' });
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Runtime Dependencies',
    );
  });

  it('renders a custom title when provided', () => {
    fixture.componentRef.setInput('title', 'Build time dependencies');
    fixture.componentRef.setInput('dependencies', { vitest: '2.0.0' });
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Build time dependencies',
    );
  });

  it('renders provided dependencies', () => {
    fixture.componentRef.setInput('dependencies', { angular: '21.0.0' });
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('angular');
    expect(text).toContain('21.0.0');
  });
});
