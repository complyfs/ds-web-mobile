import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaDisplayComponent } from './text-area-display.component';

describe('TextAreaDisplayComponent', () => {
  let component: TextAreaDisplayComponent;
  let fixture: ComponentFixture<TextAreaDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
