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

import { Dependencies } from './dependencies';

describe('Dependencies', () => {
  let fixture: ComponentFixture<Dependencies>;
  let component: Dependencies;

  beforeAll(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dependencies],
    }).compileComponents();

    fixture = TestBed.createComponent(Dependencies);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    fixture.componentRef.setInput('dependencies', {});
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('renders the default title when no custom title is provided', () => {
    fixture.componentRef.setInput('dependencies', {
      angular: '21.0.0',
    });
    fixture.detectChanges();

    const headingDebugElement = fixture.debugElement.query(By.css('h3'));
    const headingElement =
      headingDebugElement.nativeElement as HTMLHeadingElement;

    expect(headingElement.textContent?.trim()).toBe('Runtime Dependencies');
  });

  it('renders a custom title when one is provided', () => {
    fixture.componentRef.setInput('title', 'Build Time Dependencies');
    fixture.componentRef.setInput('dependencies', {
      vite: '7.0.0',
    });
    fixture.detectChanges();

    const headingDebugElement = fixture.debugElement.query(By.css('h3'));
    const headingElement =
      headingDebugElement.nativeElement as HTMLHeadingElement;

    expect(headingElement.textContent?.trim()).toBe('Build Time Dependencies');
  });

  it('transforms dependency records into alphabetically sorted table rows', () => {
    fixture.componentRef.setInput('dependencies', {
      zod: '4.0.0',
      angular: '21.0.0',
      dayjs: '1.11.0',
    });
    fixture.detectChanges();

    const rowDebugElements = fixture.debugElement.queryAll(By.css('tbody tr'));

    expect(rowDebugElements).toHaveLength(3);

    const rowValues = rowDebugElements.map((rowDebugElement) => {
      const cellDebugElements = rowDebugElement.queryAll(By.css('th, td'));
      const packageCell = cellDebugElements[0]
        .nativeElement as HTMLTableCellElement;
      const versionCell = cellDebugElements[1]
        .nativeElement as HTMLTableCellElement;

      return {
        name: packageCell.textContent?.trim(),
        version: versionCell.textContent?.trim(),
      };
    });

    expect(rowValues).toEqual([
      { name: 'angular', version: '21.0.0' },
      { name: 'dayjs', version: '1.11.0' },
      { name: 'zod', version: '4.0.0' },
    ]);
  });

  it('renders the title in the table caption for accessibility', () => {
    fixture.componentRef.setInput('title', 'Selected Dependencies');
    fixture.componentRef.setInput('dependencies', {
      angular: '21.0.0',
    });
    fixture.detectChanges();

    const captionDebugElement = fixture.debugElement.query(By.css('caption'));
    const captionElement =
      captionDebugElement.nativeElement as HTMLTableCaptionElement;

    expect(captionElement.textContent?.trim()).toBe('Selected Dependencies');
  });
});
