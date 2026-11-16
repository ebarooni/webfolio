import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AstroToAngular } from './astro-to-angular';

describe('AstroToAngular', () => {
  let fixture: ComponentFixture<AstroToAngular>;
  let component: AstroToAngular;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [AstroToAngular],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstroToAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('leaves the article title to the post page', () => {
    expect(fixture.debugElement.query(By.css('h1'))).toBeNull();
  });

  it('renders section headings', () => {
    const headingsDebug = fixture.debugElement.queryAll(By.css('h2'));
    const texts = headingsDebug.map((el) => {
      const h = el.nativeElement as HTMLHeadingElement;
      return h.textContent?.trim();
    });

    expect(texts).toContain('Why Astro Was Great at First');
    expect(texts).toContain('How My Site Has Changed');
    expect(texts).toContain('Would I Recommend Angular for Everyone?');
    expect(texts).toContain('Final Thoughts');
  });
});
