import { Injectable, OnInit, isDevMode } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { User } from "../models/user";
import { BaseService } from "./baseService";
import { Router } from "@angular/router";
import { HttpUtil } from "./httpUtil";


@Injectable()
export class UserService extends BaseService {
    User: User;
    private baseAddress: string;

    constructor(private _http: Http, private _router: Router) {
        super(_http);
        this.baseAddress = isDevMode() ? 'http://localhost:80' : '';
    }

    async registerUser(user:User) {
        const response = await this.sendPostRequest(this.baseAddress + '/api/user/register/', user);
        this.doLogin(response.json());
    }

    async loginUser(user:User) {
        try {
            const response = await this.sendPostRequest(this.baseAddress + '/api/user/login/', user);
            this.doLogin(response.json());
        }
        catch (error) {
            console.log("login failed");
        }
    }

    async findUsers(user: User) {
        const response = await this.sendPostRequest(this.baseAddress + '/api/user/search', user);
        return response.json();
    }

    private doLogin(user:User) {
        this.User = user;
        HttpUtil.addUserHeaders(user);
        this._router.navigate(['characters']);
    }

    isAuthenticated() {
        this.User = HttpUtil.readCookie();
        return this.User !== undefined;
    }

    logout(): any {
        HttpUtil.logout(this.User);
        this._router.navigate(['login']);
    }
}