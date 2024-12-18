import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeSelectorModalComponent } from './theme-selector-modal.component';

describe('ThemeSelectorModalComponent', () => {
  let component: ThemeSelectorModalComponent;
  let fixture: ComponentFixture<ThemeSelectorModalComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [ThemeSelectorModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
