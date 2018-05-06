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

        let oneYear = 31536000 ;

        document.cookie = "auth=" + JSON.stringify(user) + ";max-age=" + oneYear; 
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
}