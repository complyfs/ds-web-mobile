import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbAppFileCountStatsComponent } from './vb-app-file-count-stats.component';

describe('VbAppFileCountStatsComponent', () => {
  let component: VbAppFileCountStatsComponent;
  let fixture: ComponentFixture<VbAppFileCountStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbAppFileCountStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbAppFileCountStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
