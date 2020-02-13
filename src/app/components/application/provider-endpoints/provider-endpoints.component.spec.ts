import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderEndpointsComponent } from './provider-endpoints.component';

describe('ProviderEndpointsComponent', () => {
  let component: ProviderEndpointsComponent;
  let fixture: ComponentFixture<ProviderEndpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderEndpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
