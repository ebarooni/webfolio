import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentDetailsComponent } from './deployment-details.component';

describe('DeploymentDetailsComponent', () => {
  let component: DeploymentDetailsComponent;
  let fixture: ComponentFixture<DeploymentDetailsComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [DeploymentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeploymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
