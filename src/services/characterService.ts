import { Injectable } from "@angular/core";
import { BaseService } from "./baseService";
import { Http } from "@angular/http";
import { TrudvangCharacter } from "../models/TrudvangCharacter";
import { HttpClient } from "@angular/common/http";
import { isDevMode } from '@angular/core';

@Injectable()
export class CharacterService {
  private baseAddress: string;

  constructor(private _http: HttpClient) {
    this.baseAddress = isDevMode() ? 'http://localhost:80' : '';
  }

  async updateCharacter(character: TrudvangCharacter) {
    await this._http.post(this.baseAddress + '/api/character/save', character).toPromise();
  }

  async getCharacter(id: string) {
    return await this._http.get(this.baseAddress + '/api/character/find/' + id).toPromise();
  }

  async deleteCharacter(characterId : string) {
    await this._http.delete(this.baseAddress + '/api/character/delete/' + characterId).toPromise();
  }

  async createCharacter(character: TrudvangCharacter) {
    await this._http.put(this.baseAddress + '/api/character/create/', character).toPromise();
  }

  async getCharacters(userId: string) {
      return await this._http.get<TrudvangCharacter[]>(this.baseAddress + '/api/character/all/' + userId, {responseType: 'json'}).toPromise();
  }

  async getSharedCharacters(userName: string) {
    return await this._http.get<TrudvangCharacter[]>(this.baseAddress + '/api/character/shared/' + userName, {responseType: 'json'}).toPromise();
  }
}