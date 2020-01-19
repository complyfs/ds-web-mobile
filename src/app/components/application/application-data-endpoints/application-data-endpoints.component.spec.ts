import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDataEndpointsComponent } from './application-data-endpoints.component';

describe('ApplicationDataEndpointsComponent', () => {
  let component: ApplicationDataEndpointsComponent;
  let fixture: ComponentFixture<ApplicationDataEndpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDataEndpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDataEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
