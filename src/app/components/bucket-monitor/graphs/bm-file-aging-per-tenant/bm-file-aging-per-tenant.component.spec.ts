import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmFileAgingPerTenantComponent } from './bm-file-aging-per-tenant.component';

describe('BmFileAgingPerTenantComponent', () => {
  let component: BmFileAgingPerTenantComponent;
  let fixture: ComponentFixture<BmFileAgingPerTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmFileAgingPerTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmFileAgingPerTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
