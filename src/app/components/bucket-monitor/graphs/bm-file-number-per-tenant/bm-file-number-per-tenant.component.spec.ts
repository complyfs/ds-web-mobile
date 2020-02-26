import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmFileNumberPerTenantComponent } from './bm-file-number-per-tenant.component';

describe('BmFileNumberPerTenantComponent', () => {
  let component: BmFileNumberPerTenantComponent;
  let fixture: ComponentFixture<BmFileNumberPerTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmFileNumberPerTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmFileNumberPerTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
