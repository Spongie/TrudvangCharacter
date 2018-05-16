import { Component, OnInit, Input } from '@angular/core';
import { TrudvangCharacter } from '../../../models/TrudvangCharacter';

@Component({
  selector: 'app-combat-tab',
  templateUrl: './combat-tab.component.html',
  styleUrls: ['./combat-tab.component.css']
})
export class CombatTabComponent implements OnInit {

  @Input() model: TrudvangCharacter;
  
  constructor() { }

  ngOnInit() {
  }

}
