import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationJobsComponent } from './application-jobs.component';

describe('ApplicationJobsComponent', () => {
  let component: ApplicationJobsComponent;
  let fixture: ComponentFixture<ApplicationJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
