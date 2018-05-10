import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';
import { TrudvangCharacter } from '../../models/TrudvangCharacter';
import { CharacterService } from '../../services/characterService';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters: TrudvangCharacter[];
  sharedCharacters: TrudvangCharacter[];

  constructor(private userService: UserService, private _router: Router, private characterService: CharacterService) {
    if (userService.isAuthenticated()) {
      this.updateCharacters();
      this.updateSharedCharacters();
    }
  }

  ngOnInit() {
    if (!this.userService.isAuthenticated()) {
      this._router.navigate(['login']);
    }
  }

  async updateCharacters() {
    await this.characterService.getCharacters(this.userService.User._id).then(data => {
      this.characters = data;
    });
  }

  async updateSharedCharacters() {
    try {
      await this.characterService.getSharedCharacters(this.userService.User.userName).then(data => {
        this.sharedCharacters = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createCharacter() {
    let character = new TrudvangCharacter();
    character.ownerId = this.userService.User._id;
    character.updateSkillOwners(null);

    await this.characterService.createCharacter(character);
    await this.updateCharacters();
  }

  //This randomly does not update so i will not allow delete yet
  async deleteCharacter(characterId: string) {
    await this.characterService.deleteCharacter(characterId);
    await this.updateCharacters();
  }

  goToCharacter(characterId: string) {
    this._router.navigate(['/character', characterId]);
  }
}
