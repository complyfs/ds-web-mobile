import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtBucketAppsDashboardComponent } from './virt-bucket-apps-dashboard.component';

describe('VirtBucketAppsDashboardComponent', () => {
  let component: VirtBucketAppsDashboardComponent;
  let fixture: ComponentFixture<VirtBucketAppsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtBucketAppsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtBucketAppsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
