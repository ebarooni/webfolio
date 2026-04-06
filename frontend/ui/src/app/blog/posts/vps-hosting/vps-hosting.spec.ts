import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpsHosting } from './vps-hosting';
import { By } from '@angular/platform-browser';

describe('VpsHosting', () => {
  let component: VpsHosting;
  let fixture: ComponentFixture<VpsHosting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VpsHosting],
    }).compileComponents();

    fixture = TestBed.createComponent(VpsHosting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the article title', () => {
    const headingDebug = fixture.debugElement.query(By.css('h1'));
    const heading = headingDebug.nativeElement as HTMLHeadingElement;

    expect(heading.textContent?.trim()).toContain(
      'Moving Away from Firebase Hosting',
    );
  });

  it('renders section headings', () => {
    const headingsDebug = fixture.debugElement.queryAll(By.css('h2'));
    const texts = headingsDebug.map((el) => {
      const h = el.nativeElement as HTMLHeadingElement;
      return h.textContent?.trim();
    });

    expect(texts).toContain('Why I Left Firebase Hosting');
    expect(texts).toContain('Step 1: Creating the Server');
    expect(texts).toContain('Step 2: Firewall and SSH');
    expect(texts).toContain('Step 3: Domain and DNS');
    expect(texts).toContain('Step 4: Deployment with Docker and Caddy');
    expect(texts).toContain('Updating and Adding Services');
    expect(texts).toContain('Was It Worth It?');
  });
});
