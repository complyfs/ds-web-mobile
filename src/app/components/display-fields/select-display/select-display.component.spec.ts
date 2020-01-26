import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDisplayComponent } from './select-display.component';

describe('SelectDisplayComponent', () => {
  let component: SelectDisplayComponent;
  let fixture: ComponentFixture<SelectDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
