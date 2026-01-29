import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AstroToAngularComponent } from './astro-to-angular.component';

describe('AstroToAngularComponent', () => {
  let component: AstroToAngularComponent;
  let fixture: ComponentFixture<AstroToAngularComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AstroToAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AstroToAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
