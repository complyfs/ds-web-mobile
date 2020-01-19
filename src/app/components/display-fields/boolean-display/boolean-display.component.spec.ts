import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanDisplayComponent } from './boolean-display.component';

describe('BooleanDisplayComponent', () => {
  let component: BooleanDisplayComponent;
  let fixture: ComponentFixture<BooleanDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
