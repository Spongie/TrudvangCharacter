import { Component, OnInit, Input } from '@angular/core';
import { TrudvangCharacter } from '../../../models/TrudvangCharacter';

@Component({
  selector: 'app-skills-tab',
  templateUrl: './skills-tab.component.html',
  styleUrls: ['./skills-tab.component.css']
})
export class SkillsTabComponent implements OnInit {

  @Input() model: TrudvangCharacter;
  
  constructor() { }

  ngOnInit() {
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
