import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDataStoresComponent } from './application-data-stores.component';

describe('ApplicationDataStoresComponent', () => {
  let component: ApplicationDataStoresComponent;
  let fixture: ComponentFixture<ApplicationDataStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDataStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDataStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
