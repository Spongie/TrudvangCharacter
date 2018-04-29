import { Injectable } from "@angular/core";
import { BaseService } from "./baseService";
import { Http } from "@angular/http";
import { TrudvangCharacter } from "../models/TrudvangCharacter";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CharacterService {

  constructor(private _http: HttpClient) {
  }

  async updateCharacter(character: TrudvangCharacter) {
    await this._http.post('http://localhost:3000/api/character/save', character).toPromise();
  }

  async getCharacter(id: String) {
    return await this._http.get('http://localhost:3000/api/character/find/' + id).toPromise();
  }

  async deleteCharacter(characterId : String) {
    await this._http.delete('http://localhost:3000/api/character/delete/' + characterId).toPromise();
  }

  async createCharacter(character: TrudvangCharacter) {
    await this._http.put('http://localhost:3000/api/character/create/', character).toPromise();
  }

  async getCharacters(userId: String) {
      return await this._http.get<TrudvangCharacter[]>('http://localhost:3000/api/character/all/' + userId, {responseType: 'json'}).toPromise();
  }
}