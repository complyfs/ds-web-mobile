import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmHistoryMaxPerTimeComponent } from './bm-history-max-per-time.component';

describe('BmHistoryMaxPerTimeComponent', () => {
  let component: BmHistoryMaxPerTimeComponent;
  let fixture: ComponentFixture<BmHistoryMaxPerTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmHistoryMaxPerTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmHistoryMaxPerTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
