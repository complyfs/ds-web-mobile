import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmFilesOverTimeComponent } from './bm-files-over-time.component';

describe('BmFilesOverTimeComponent', () => {
  let component: BmFilesOverTimeComponent;
  let fixture: ComponentFixture<BmFilesOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmFilesOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmFilesOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
