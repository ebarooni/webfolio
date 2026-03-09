import { By } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders a router outlet', () => {
    const routerOutletDebugElement = fixture.debugElement.query(
      By.directive(RouterOutlet),
    );

    expect(routerOutletDebugElement).not.toBeNull();
  });
});
