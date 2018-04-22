import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { 
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Register: ');
    console.log(this.user.userName);
    console.log(this.user.password);
    this.userService.registerUser(this.user);
  }

}
