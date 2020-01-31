import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCredentialNameComponent } from './provider-credential-name.component';

describe('ProviderCredentialNameComponent', () => {
  let component: ProviderCredentialNameComponent;
  let fixture: ComponentFixture<ProviderCredentialNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCredentialNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCredentialNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
