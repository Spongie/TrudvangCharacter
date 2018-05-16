import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatTabComponent } from './combat-tab.component';

describe('CombatTabComponent', () => {
  let component: CombatTabComponent;
  let fixture: ComponentFixture<CombatTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
