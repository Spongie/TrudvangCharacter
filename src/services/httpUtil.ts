import { Headers } from "@angular/http";
import { User } from "../models/user";

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
    }
}