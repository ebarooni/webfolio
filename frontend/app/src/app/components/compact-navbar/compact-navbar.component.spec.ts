import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompactNavbarComponent } from './compact-navbar.component';

describe('CompactNavbarComponent', () => {
  let component: CompactNavbarComponent;
  let fixture: ComponentFixture<CompactNavbarComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [CompactNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompactNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
