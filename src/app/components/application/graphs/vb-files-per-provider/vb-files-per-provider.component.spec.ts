import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbFilesPerProviderComponent } from './vb-files-per-provider.component';

describe('VbFilesPerProviderComponent', () => {
  let component: VbFilesPerProviderComponent;
  let fixture: ComponentFixture<VbFilesPerProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbFilesPerProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbFilesPerProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
