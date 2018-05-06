import { Injectable, OnInit } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { User } from "../models/user";
import { BaseService } from "./baseService";
import { Router } from "@angular/router";
import { HttpUtil } from "./httpUtil";


@Injectable()
export class UserService extends BaseService {
    User: User;

    constructor(private _http: Http, private _router: Router) {
        super(_http);
    }

    async registerUser(user:User) {
        const response = await this.sendPostRequest('user/register/', user);
        this.doLogin(response.json());
    }

    async loginUser(user:User) {
        try {
            const response = await this.sendPostRequest('user/login/', user);
            this.doLogin(response.json());
        }
        catch (error) {
            console.log("login failed");
        }
    }

    private doLogin(user:User) {
        this.User = user;
        HttpUtil.addUserHeaders(user);
        this._router.navigate(['characters']);
    }

    isAuthenticated() {
        this.User = HttpUtil.readCookie();
        console.log(this.User);
        return this.User !== undefined;
    }

    logout(): any {
        HttpUtil.logout(this.User);
        this._router.navigate(['login']);
    }
}