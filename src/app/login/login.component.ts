import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { 
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user.userName);
    console.log(this.user.password);
    this.userService.loginUser(this.user);
  }
}
