import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
