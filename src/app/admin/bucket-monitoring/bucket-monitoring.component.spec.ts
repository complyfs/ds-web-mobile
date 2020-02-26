import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketMonitoringComponent } from './bucket-monitoring.component';

describe('BucketMonitoringComponent', () => {
  let component: BucketMonitoringComponent;
  let fixture: ComponentFixture<BucketMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
