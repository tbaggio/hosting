import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInfosComponent } from './get-infos.component';

describe('GetInfosComponent', () => {
  let component: GetInfosComponent;
  let fixture: ComponentFixture<GetInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
