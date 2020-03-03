import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbSizePerProviderComponent } from './vb-size-per-provider.component';

describe('VbSizePerProviderComponent', () => {
  let component: VbSizePerProviderComponent;
  let fixture: ComponentFixture<VbSizePerProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbSizePerProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbSizePerProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
