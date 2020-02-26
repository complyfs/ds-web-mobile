import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmMostRecentFilePerTenantComponent } from './bm-most-recent-file-per-tenant.component';

describe('BmMostRecentFilePerTenantComponent', () => {
  let component: BmMostRecentFilePerTenantComponent;
  let fixture: ComponentFixture<BmMostRecentFilePerTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmMostRecentFilePerTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmMostRecentFilePerTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
