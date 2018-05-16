import { Component, OnInit, Input } from '@angular/core';
import { TrudvangCharacter } from '../../../models/TrudvangCharacter';

@Component({
  selector: 'app-items-tab',
  templateUrl: './items-tab.component.html',
  styleUrls: ['./items-tab.component.css']
})
export class ItemsTabComponent implements OnInit {

  @Input() model: TrudvangCharacter;
  
  constructor() { }

  ngOnInit() {
  }

}
