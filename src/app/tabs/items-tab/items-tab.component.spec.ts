import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsTabComponent } from './items-tab.component';

describe('ItemsTabComponent', () => {
  let component: ItemsTabComponent;
  let fixture: ComponentFixture<ItemsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
