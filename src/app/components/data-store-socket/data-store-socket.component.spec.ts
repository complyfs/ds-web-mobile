import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStoreSocketComponent } from './data-store-socket.component';

describe('DataStoreSocketComponent', () => {
  let component: DataStoreSocketComponent;
  let fixture: ComponentFixture<DataStoreSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataStoreSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStoreSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
