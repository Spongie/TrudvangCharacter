import { Component } from '@angular/core';
import { TrudvangCharacter } from '../models/TrudvangCharacter';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalService: NgbModal) {
    this.model = new TrudvangCharacter();
  }

  model: TrudvangCharacter;

  onSubmit() {
    console.log(this.model);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
    }, (reason) => {
      //Dismissed
    });
  }

  onSubmitModal(form) {
    this.model.availableXp += form.value.inputAddExp;
  }
}
