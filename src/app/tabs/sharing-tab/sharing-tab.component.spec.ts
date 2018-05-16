import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingTabComponent } from './sharing-tab.component';

describe('SharingTabComponent', () => {
  let component: SharingTabComponent;
  let fixture: ComponentFixture<SharingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
