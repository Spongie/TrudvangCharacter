import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private _router: Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this._router.navigate(['character']);
    }
  }

  onSubmit() {
    this.userService.registerUser(this.user);
  }

}
