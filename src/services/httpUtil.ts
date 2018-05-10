import { Headers } from "@angular/http";
import { User } from "../models/user";
import { AuthCookie } from "../models/authCookie";

export class HttpUtil {
    private static headers = new Headers();

    static getHeaders() {
        if (!this.headers.has('Access-Control-Allow-Origin')) {
            this.headers.append('Access-Control-Allow-Origin', '');
        }

        return this.headers;
    }

    static addUserHeaders(user: User) {
        this.headers.append('username', user.userName);
        this.headers.append('authkey', user._id);
        this.headers.append('password', user.password);
        this.writeAuthCookie(user, false);
    }

    static readCookie() : User {
        let x = document.cookie;
        let cookies = x.split(';');

        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].startsWith('auth=')) {
                let value = cookies[i].substr('auth='.length);
                return JSON.parse(value);       
            }
        }
    }

    private static writeAuthCookie(user: User, logout:boolean) {
        let oneYear = 31536000;
        let expireAge = logout ? ";expires=Thu, 01 Jan 1970 00:00:01 GMT" : ";max-age=" + oneYear;
        console.log(expireAge);
        document.cookie = "auth=" + JSON.stringify(user) + expireAge; 
    }

    static logout(user:User) {
        this.writeAuthCookie(user, true);
    }
}