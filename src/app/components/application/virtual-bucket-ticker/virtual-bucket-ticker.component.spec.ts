import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualBucketTickerComponent } from './virtual-bucket-ticker.component';

describe('VirtualBucketTickerComponent', () => {
  let component: VirtualBucketTickerComponent;
  let fixture: ComponentFixture<VirtualBucketTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualBucketTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualBucketTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
