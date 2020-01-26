import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRestCredentialsComponent } from './application-rest-credentials.component';

describe('ApplicationRestCredentialsComponent', () => {
  let component: ApplicationRestCredentialsComponent;
  let fixture: ComponentFixture<ApplicationRestCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRestCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRestCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
