import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmFileSizePerTenantComponent } from './bm-file-size-per-tenant.component';

describe('BmFileSizePerTenantComponent', () => {
  let component: BmFileSizePerTenantComponent;
  let fixture: ComponentFixture<BmFileSizePerTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmFileSizePerTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmFileSizePerTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
