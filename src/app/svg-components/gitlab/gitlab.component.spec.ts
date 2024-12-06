import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GitlabComponent } from './gitlab.component';

describe('GitlabComponent', () => {
  let component: GitlabComponent;
  let fixture: ComponentFixture<GitlabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GitlabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GitlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
