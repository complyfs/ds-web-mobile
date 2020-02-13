import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualBucketsComponent } from './virtual-buckets.component';

describe('VirtualBucketsComponent', () => {
  let component: VirtualBucketsComponent;
  let fixture: ComponentFixture<VirtualBucketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualBucketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualBucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
