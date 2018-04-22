import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { User } from "../models/user";
import { BaseService } from "./baseService";

@Injectable()
export class UserService extends BaseService {

    constructor(private _http: Http) {
        super(_http);
    }

    async registerUser(user:User) {
        const response = this.sendPostRequest('http://localhost:3000/api/user/register/', user);
        console.log(response);
    }

    async loginUser(user:User) {
        const response = await this.sendPostRequest('http://localhost:3000/api/user/login/', user);
        console.log(response);
    }
}