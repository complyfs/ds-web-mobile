import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmDashboardComponent } from './bm-dashboard.component';

describe('BmDashboardComponent', () => {
  let component: BmDashboardComponent;
  let fixture: ComponentFixture<BmDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
