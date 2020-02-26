import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmListPanelComponent } from './bm-list-panel.component';

describe('BmListPanelComponent', () => {
  let component: BmListPanelComponent;
  let fixture: ComponentFixture<BmListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmListPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
