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
    await this._http.post('/api/character/save', character).toPromise();
  }

  async getCharacter(id: string) {
    return await this._http.get('/api/character/find/' + id).toPromise();
  }

  async deleteCharacter(characterId : string) {
    await this._http.delete('/api/character/delete/' + characterId).toPromise();
  }

  async createCharacter(character: TrudvangCharacter) {
    await this._http.put('/api/character/create/', character).toPromise();
  }

  async getCharacters(userId: string) {
      return await this._http.get<TrudvangCharacter[]>('/api/character/all/' + userId, {responseType: 'json'}).toPromise();
  }

  async getSharedCharacters(userName: string) {
    return await this._http.get<TrudvangCharacter[]>('/api/character/shared/' + userName, {responseType: 'json'}).toPromise();
  }
}