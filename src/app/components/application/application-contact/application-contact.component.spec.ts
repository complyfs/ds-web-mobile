import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationContactComponent } from './application-contact.component';

describe('ApplicationContactComponent', () => {
  let component: ApplicationContactComponent;
  let fixture: ComponentFixture<ApplicationContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
