import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private _router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this._router.navigate(['characters']);
    }
  }

  async onSubmit() {
    await this.userService.loginUser(this.user);
  }
}
