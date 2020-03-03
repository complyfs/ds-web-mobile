import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbFilesPerTimePeriodComponent } from './vb-files-per-time-period.component';

describe('VbFilesPerTimePeriodComponent', () => {
  let component: VbFilesPerTimePeriodComponent;
  let fixture: ComponentFixture<VbFilesPerTimePeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbFilesPerTimePeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbFilesPerTimePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
