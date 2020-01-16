import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialNameComponent } from './credential-name.component';

describe('CredentialNameComponent', () => {
  let component: CredentialNameComponent;
  let fixture: ComponentFixture<CredentialNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
