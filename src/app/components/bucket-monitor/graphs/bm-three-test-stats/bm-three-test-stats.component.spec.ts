import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmThreeTestStatsComponent } from './bm-three-test-stats.component';

describe('BmThreeTestStatsComponent', () => {
  let component: BmThreeTestStatsComponent;
  let fixture: ComponentFixture<BmThreeTestStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmThreeTestStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmThreeTestStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
