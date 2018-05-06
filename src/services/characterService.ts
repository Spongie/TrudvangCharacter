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
    await this._http.post(BaseService.baseApiUrl + 'character/save', character).toPromise();
  }

  async getCharacter(id: String) {
    return await this._http.get(BaseService.baseApiUrl + 'character/find/' + id).toPromise();
  }

  async deleteCharacter(characterId : String) {
    await this._http.delete(BaseService.baseApiUrl + 'character/delete/' + characterId).toPromise();
  }

  async createCharacter(character: TrudvangCharacter) {
    await this._http.put(BaseService.baseApiUrl + 'character/create/', character).toPromise();
  }

  async getCharacters(userId: String) {
      return await this._http.get<TrudvangCharacter[]>(BaseService.baseApiUrl + 'character/all/' + userId, {responseType: 'json'}).toPromise();
  }
}