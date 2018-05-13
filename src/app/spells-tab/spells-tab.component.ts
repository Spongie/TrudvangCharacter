import { Component, OnInit, Input } from '@angular/core';
import { TrudvangCharacter } from '../../models/TrudvangCharacter';

@Component({
  selector: 'app-spells-tab',
  templateUrl: './spells-tab.component.html',
  styleUrls: ['./spells-tab.component.css']
})
export class SpellsTabComponent implements OnInit {

  @Input() model: TrudvangCharacter;
  constructor() { }

  ngOnInit() {
  }

}
