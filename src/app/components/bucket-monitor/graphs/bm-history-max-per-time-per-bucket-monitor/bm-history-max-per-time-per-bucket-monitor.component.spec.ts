import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmHistoryMaxPerTimePerBucketMonitorComponent } from './bm-history-max-per-time-per-bucket-monitor.component';

describe('BmHistoryMaxPerTimePerBucketMonitorComponent', () => {
  let component: BmHistoryMaxPerTimePerBucketMonitorComponent;
  let fixture: ComponentFixture<BmHistoryMaxPerTimePerBucketMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmHistoryMaxPerTimePerBucketMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmHistoryMaxPerTimePerBucketMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
