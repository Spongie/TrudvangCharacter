import { Component } from '@angular/core';
import { TrudvangCharacter } from '../models/TrudvangCharacter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.model = new TrudvangCharacter();
  }

  model: TrudvangCharacter;

  onSubmit() {
    console.log(this.model);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
