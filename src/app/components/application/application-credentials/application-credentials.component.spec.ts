import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCredentialsComponent } from './application-credentials.component';

describe('ApplicationCredentialsComponent', () => {
  let component: ApplicationCredentialsComponent;
  let fixture: ComponentFixture<ApplicationCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
