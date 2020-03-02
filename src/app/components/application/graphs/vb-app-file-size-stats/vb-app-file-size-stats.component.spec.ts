import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbAppFileSizeStatsComponent } from './vb-app-file-size-stats.component';

describe('VbAppFileSizeStatsComponent', () => {
  let component: VbAppFileSizeStatsComponent;
  let fixture: ComponentFixture<VbAppFileSizeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbAppFileSizeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbAppFileSizeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
