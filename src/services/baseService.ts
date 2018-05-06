import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { UserService } from "./userService";
import { HttpUtil } from "./httpUtil";

@Injectable()
export class BaseService {
    static baseApiUrl = 'http://localhost:3000/api/';

    constructor(private http: Http) {
        
    }

    async sendPostRequest(target: string, body:any) {
        return await this.http.post(BaseService.baseApiUrl + target, body, { headers: HttpUtil.getHeaders() }).toPromise()
    }

    async sendGetRequest(target: string) {
        return await this.http.get(BaseService.baseApiUrl + target, { headers: HttpUtil.getHeaders() }).toPromise()
    }

    async sendPutRequest(target: string, body:any) {
        return await this.http.put(BaseService.baseApiUrl + target, body, { headers: HttpUtil.getHeaders() }).toPromise()
    }

    async sendDeleteRequest(target: string) {
        return await this.http.delete(BaseService.baseApiUrl + target, { headers: HttpUtil.getHeaders() }).toPromise()
    }
}