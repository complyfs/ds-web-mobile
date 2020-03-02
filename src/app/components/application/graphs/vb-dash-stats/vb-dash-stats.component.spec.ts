import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbDashStatsComponent } from './vb-dash-stats.component';

describe('VbDashStatsComponent', () => {
  let component: VbDashStatsComponent;
  let fixture: ComponentFixture<VbDashStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbDashStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbDashStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
