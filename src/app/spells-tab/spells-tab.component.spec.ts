import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsTabComponent } from './spells-tab.component';

describe('SpellsTabComponent', () => {
  let component: SpellsTabComponent;
  let fixture: ComponentFixture<SpellsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
