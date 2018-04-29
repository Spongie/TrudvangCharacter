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

  constructor(private userService: UserService, private _router: Router, private characterService: CharacterService) {
    if (userService.User !== undefined) {
      this.updateCharacters();
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

  async createCharacter() {
    let character = new TrudvangCharacter();
    character.ownerId = this.userService.User._id;
    character.updateSkillOwners(null);

    await this.characterService.createCharacter(character);
    await this.updateCharacters();
  }

  //This randomly does not update so i will not allow delete
  async deleteCharacter(characterId : String) {
    await this.characterService.deleteCharacter(characterId);
    await this.updateCharacters();
  }

  goToCharacter(characterId:String) {
    console.log('Redirecting to: ' + characterId);
    this._router.navigate(['/character', characterId]);
  }
}
