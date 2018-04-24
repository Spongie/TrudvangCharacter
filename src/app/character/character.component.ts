import { Component, OnInit } from '@angular/core';
import { TrudvangCharacter } from '../../models/TrudvangCharacter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this._router.navigate(['login']);
    }
  }
  constructor(private modalService: NgbModal, private userService: UserService, private _router: Router) {
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
