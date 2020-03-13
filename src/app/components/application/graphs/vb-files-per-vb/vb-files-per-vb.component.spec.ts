import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbFilesPerVbComponent } from './vb-files-per-vb.component';

describe('VbFilesPerVbComponent', () => {
  let component: VbFilesPerVbComponent;
  let fixture: ComponentFixture<VbFilesPerVbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbFilesPerVbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbFilesPerVbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
