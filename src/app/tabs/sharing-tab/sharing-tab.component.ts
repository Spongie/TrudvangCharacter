import { Component, OnInit, Input } from '@angular/core';
import { TrudvangCharacter } from '../../../models/TrudvangCharacter';
import { User } from '../../../models/user';
import { UserService } from '../../../services/userService';

@Component({
  selector: 'app-sharing-tab',
  templateUrl: './sharing-tab.component.html',
  styleUrls: ['./sharing-tab.component.css']
})
export class SharingTabComponent implements OnInit {

  @Input() model: TrudvangCharacter;
  
  searchedUsers: Array<User>;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async onSearch() {
    let input = <HTMLInputElement>document.getElementById("inputSearchUser");
    let user = new User();
    user.userName = input.value;
    let users = await this.userService.findUsers(user);
    this.searchedUsers = users;
  }

}
