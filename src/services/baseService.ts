import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { UserService } from "./userService";
import { HttpUtil } from "./httpUtil";

@Injectable()
export class BaseService {
    constructor(private http: Http) {
        
    }

    async sendPostRequest(target: string, body:any) {
        return await this.http.post(target, body, { headers: HttpUtil.getHeaders() }).toPromise()
    }

    async sendGetRequest(target: string) {
        return await this.http.get(target, { headers: HttpUtil.getHeaders() }).toPromise()
    }

    async sendPutRequest(target: string, body:any) {
        return await this.http.put(target, body, { headers: HttpUtil.getHeaders() }).toPromise()
    }

    async sendDeleteRequest(target: string) {
        return await this.http.delete(target, { headers: HttpUtil.getHeaders() }).toPromise()
    }
}