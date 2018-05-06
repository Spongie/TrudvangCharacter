import { Component } from '@angular/core';
import { TrudvangCharacter } from '../models/TrudvangCharacter';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpUtil } from '../services/httpUtil';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public userService: UserService) {
  }

  logout() {
    this.userService.logout();
  }
}
